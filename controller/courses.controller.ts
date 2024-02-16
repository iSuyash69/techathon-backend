import { Request, Response } from "express";
import courseModel from "../models/course.model";
import { exitCode } from "process";
import userModel from "../models/user.model";

export const homeController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await courseModel.find();
    res.status(200).json({
      success: true,
      data: response,
      message: "Data retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: "cant retrieve data from database",
    });
  }
};

export const CourseController = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
      
      const {
        course_name,
        image_url,
        tutor_name,
        description,
        category,
        domain,
        email_id
      } = req.body;


      const email=req.body.user.email_id;
        // console.log("hello bro");
      // const user_id=req.cookies.user._id;

      // console.log("this is user cookies",req.cookies);
      // return;

      // console.log("This is user Id", user_id);
  
      if (!course_name || !image_url || !tutor_name || !domain || !description || !category || !email_id) {
        return res.status(401).json({
          success: false,
          data: "bad request",
          message: "field is empty"
        });
      }
  
      console.log(course_name, image_url, tutor_name, description, category, domain);
  
      const response = await courseModel.create({
        course_name,
        image_url,
        tutor_name,
        description,
        category,
        domain,
        email_id
      });
  
      const courseResponse = await userModel
      .findOneAndUpdate(
        { email_id: email },
        { $push: { courses: response._id } },
        { new: true } 
      );
    

      
      res.status(200).json({
        success: true,
        data: response,
        message: "course created successfully"
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        data: "internal server error",
        message: "an error occurred while creating the course"
      });
    }
  };
  


export const  getCourseByIdController=async (req:Request,res:Response)=>{

   try {
    
    const {course_id}=req.params;
    console.log("this is course by id");


    const response=await courseModel.findById({_id:course_id}).populate('modules');
    res.status(200).json({
        success:true,
        data:response,
        message:"data fetched successfully"

    })
}catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        data:"internal server",
        message:"an error occured while fetching courses"
    })


}


}