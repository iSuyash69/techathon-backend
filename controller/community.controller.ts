import { Request, Response } from "express";
import studentModel from "../models/user.model";
import { exitCode } from "process";
import communityModel from "../models/community.model";

export const getCommunityController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Destructuring the email_id from the request body
    const { email_id } = req.body;

    // Using Mongoose's findOne method to find a student by email_id
    const response = await studentModel
      .findOne({ email_id })
      .populate("community") // Populating the "community" field in the found student document
      .exec();

    // Sending a success response with the fetched data
    if (response) {
      res.status(200).json({
        success: true,
        data: response,
        message: "Communities fetched successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        data: null,
        message: "Student not found with the provided email_id",
      });
    }
  } catch (err) {
    // Handling errors and sending an error response if there's an exception
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error, unable to fetch community",
    });
  }
};

export const addCommunityController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email_id, community_id } = req.body;
    console.log("this one has called");
    // Assuming studentModel is your Mongoose model for students
    const response = await studentModel.findOneAndUpdate(
      { email_id },
      { $push: { community: community_id } },
      { new: true } // To get the updated document as the result
    );

    res.status(200).json({
      success: true,
      data: response,
      message: "Community added successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal server error",
    });
  }
};

export const createCommunityController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { courseId, title } = req.body;
    const response = await communityModel.create({
      title,
      courseId,
    });

    res.status(200).json({
      success: true,
      data: "community created",
      message: "community created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: "internal server errror",
      message: "an error occured while creating community",
    });
  }
};
