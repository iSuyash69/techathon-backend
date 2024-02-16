import express, { Request, Response, NextFunction } from "express";
import student from "../types/student.types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import resBody from "../types/resBody.types";
dotenv.config();

// ...

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token:string = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        data: "not found",
        message: "Token not found",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_KEY || "");
      req.body.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        success: false,
        data: "invalid token",
        message: "An error occurred while decoding the token",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      success: false,
      data: "bad request",
      message: "An error occurred while authenticating token",
    });
  }
};

export const isStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req.body.user.role;

    if (role !== "student" && role !== "tutor") {
      return res.status(403).json({
        success: false,
        data: "access denied",
        message: "This is a protected route",
      });
    }

    // If the user is a student or tutor, move to the next middleware
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while authorizing",
      data: "access denied",
    });
  }
};

export const isTutor = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const role = req.body.user.role;

    if (role !== "tutor") {
      return res.status(403).json({
        success: false,
        data: "access denied",
        message: "This is a protected route",
      });
    }

    // If the user is a tutor, move to the next middleware
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while authorizing",
      data: "access denied",
    });
  }
};
