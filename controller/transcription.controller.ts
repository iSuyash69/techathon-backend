import OpenAI from "openai";
import fs from "fs";
import dotenv from "dotenv";
import { model } from "mongoose";
import { Request, Response } from "express";
dotenv.config;

const openai = new OpenAI({
  apiKey: "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" ,
});

const audiofun = async (): Promise<any> => {
    console .log("this is called")
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream("audio.mp3"),
    model: "whisper-1",
  });

  console.log("trancription");
};

export const transcriptionController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const response = await audiofun();

    res.status(200).send(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("an error occured");
  }
};
