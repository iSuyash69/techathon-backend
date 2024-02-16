import express, { Request, Response, NextFunction } from "express";
import student from "../types/student.types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const auth =async (req: Request, res: Response, next: NextFunction):Promise< void> => {
  try {
    const token = req.cookies.token;
    console.log(token);

    if (!token) {
      res.status(404).json({
        success: false,
        data: "not found",
        message: "token not found",

      });

      return;
    }

    try {
      const decode = await jwt.verify(token, process.env.JWT_KEY || "");

      req.body.user = decode;

      next();

    } catch (err) {
      res.status(401).json({
        success: false,
        data: "invalid token",
        message: "an error occured while decoding the token",
      });
      console.log(err);
    }

    
  } catch (err) {
    res.status(401).json({
      success: false,
      data: "bad request",
      message: "an error occured while authenticating token",
    });
    return;
  }
};



export const isStudent=async (req: Request, res: Response, next: NextFunction):Promise< void> => {
    try{
       const role= req.body.user.role;
        console.log(role)
        next();

       if(role!='student' &&  role!='tutor'){
        res.status(401).json({
            success:false,
            data:'access denied',
            message:'this is protected route'

        })
        return;

      }
      res.status(200).json({
        success:true,
        data:'authorization approved',
        message:'access given successfully'

      })


  
    }catch(err){
        res.status(500).json({
            success:false,
            messgae:"error occured while autorizing",
            data:'access denied'
        })
    }
}


export const isTutor=async (req: Request, res: Response, next: NextFunction):Promise< void> => {
  try{
     const role= req.body.user.role;
     next();

     if(role!='tutor'){
      res.status(401).json({
          success:false,
          data:'access denied',
          message:'this is protected route'

      })

     return;
     }


     res.status(200).json({
      success:true,
      data:'authorization approved',
      message:'access given successfully'

    })

 

    return;


  }catch(err){
      res.status(500).json({
          success:false,
          messgae:"error occured while autorizing",
          data:'access denied'
      })
  }
}