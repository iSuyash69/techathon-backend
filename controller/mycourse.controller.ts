import { Request, Response } from "express";
import studentModel from "../models/user.model";

export const mycourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.cookies.user||req.header("Authorization")?.replace("Bearer ", "");
        const response = await studentModel.findById(_id).populate('courses');

        res.status(200).json({
            success: true,
            data: response,
            message: "Courses retrieved successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: "Can't retrieve courses"
        });
    }
};

export const addmycourse = async (req: Request, res: Response): Promise<void> => {
    try {
        const { _id } = req.cookies.user||req.header("Authorization")?.replace("Bearer ", "");
        const { courseId } = req.body; 
        const response = await studentModel.findByIdAndUpdate(
            _id,
            { $push: { courses: courseId } }, 
            { new: true } 
        ).populate('courses');

        res.status(200).json({
            success: true,
            data: response,
            message: "Course added successfully"
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            data: "Internal server error",
            message: "Can't add course"
        });
    }
};
