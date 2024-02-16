import express, { Request, Response } from "express";
import studentModel from "../models/user.model";
import student from "../types/student.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email_id, password ,role } = req.body;
    console.log(req.body);
    if (!email_id || !password ||!role) {
      
      res.status(401).json({
        success: false,
        data: "Bad request",
        message: "field is empty",
      });
      return;
    }
    const user = await studentModel.findOne({ email_id });

    if (!user || user.role!==role) {
      res.status(404).json({
        success: false,
        data: "Bad request",
        message: "user not found",
      });

      return;
    }

    const payload: student = {
      email_id: user.email_id,
      password: user.password,
      role:user.role,
      name:user.name,
    };

    // const secretKey: string = process.env.JWT_KEY || "";

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, process.env.JWT_KEY || "", {
        expiresIn: "5h",
      });


      user.token = token;
      user.password = "";

      const option:any = {
        httpOnly: true,
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        sameSite:'none',
      };

      res.cookie("token", token, option).status(200).json({
        success: true,
        token,
        user,
        message: "user logged in successfully",
      });
    }

    else{
      res.status(500).json({status:false,message:"Invalid Paasword"});
      return;
    }

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "an error ocuurd",
    });
  }
};

export default loginController;
