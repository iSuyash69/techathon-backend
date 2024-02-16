import { Request, Response } from "express";

import courseModel from "../models/course.model";
import moduleModel from "../models/module.model";
const cloudinary = require("cloudinary").v2;

export const moduleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    //This id refers to course id so we can populate the module from that array
    const { _id } = req.body;
    const response = await courseModel
      .find({ _id })
      .populate("moduleModel")
      .exec();

    res.status(200).json({
      success: true,
      data: response,
      message: "modules retrieved successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: true,
      data: "internal server errror",
      message: "can't retrieve modules",
    });
  }
};

function isFileSupportedTypes(
  fileType: String,
  supportedTypes: String[]
): boolean {
  return supportedTypes.includes(fileType);
}

async function uploadFileTOCloudinary(file: any, folder: any): Promise<any> {
  const option: any = {
    folder,
    resource_type: "auto",
  };
  return await cloudinary.uploader.upload(file.tempFilePath, option);
}

export const createModuleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name,  course_id } = req.body;
    console.log(name);

    const files = req.files?.videoFile;
    console.log(files);
    console.log("this is is arry function", Array.isArray(files));

    if (!files || Array.isArray(files)) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    const file = files;
    console.log(file);

    // validation
    const supportedTypes = ["mp3", "mp4"];

    const filetype = file.name.split(".")[1].toLowerCase();
    // if (!isFileSupportedTypes(filetype, supportedTypes)) {
    //   res.status(401).json({
    //     success: false,
    //     data: "bad request",
    //     message: "file format not supported",
    //   });
    //   return;
    // }

    // file format supported
    const response = await uploadFileTOCloudinary(file, "edtech");

    const fileData = await moduleModel.create({
      title: name,
      url: response.secure_url
    
    });

    console.log("this is file data", fileData);

    const courseData = await courseModel.findByIdAndUpdate(
      course_id,
      { $push: { modules: fileData._id } }
    );
    res.json({
      success: true,
      data:courseData,
      message: "module uploaded successfully",
    });
    console.log(response);

    // inserting entry in the database
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      data: "internal server error",
      message: "couldn't upload the file",
    });
  }
};
