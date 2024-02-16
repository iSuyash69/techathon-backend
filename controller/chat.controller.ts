import { Request, Response } from "express";
import commentModel from "../models/chat.model";
import userModel from "../models/user.model";
import communityModel from "../models/community.model";

export const addComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, email_id, body,courseId } = req.body;
    console.log("this is chat controller");
    console.log(username);
    console.log(body);
    const chat = await commentModel.create({
      username: username,
      body: body,
    });

    const chatId = chat._id;

    const response = await userModel.findByIdAndUpdate(
      { email_id: email_id },
      { $push: { community: chatId } }
    );
    // console.log("im still in chat controller");
    res.status(200).json({
      success: true,
      data: chat,
      message: "data added successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      data: "internal server error ",
      message: "cant add the chat",
    });
    console.log(err);
  }
};

export const getComment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { _id } = req.body;

    // console.log("this is called say hello");

    const response = await communityModel.findById({ _id }).populate("chats");
    res.status(200).json({
      success: true,
      data: response,
      message: "data added successfully",
    });

    return;
  } catch (err) {
    res.status(500).json({
      success: false,
      data: "internal server error ",
      message: "cant retrieve chat",
    });
  }
};
