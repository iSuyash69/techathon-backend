import { Request, Response } from "express";
import { Speechmatics } from "speechmatics";
import fs from "fs";
import pathModule from "path";
import dotenv from "dotenv";
import mongoose from "mongoose";
import moduleModel from "../models/module.model";
dotenv.config();

const API_KEY = "h2wqWRLKuOXm6B6be8VYR4NE0wA0Cvjw";
const PATH_TO_FILE = "./assets/prerequisite.mp4";

const sm = new Speechmatics(API_KEY);
const inputFile = new Blob([fs.readFileSync(PATH_TO_FILE)]);
// const subtitle = async (title:string,_id:string): Promise<void> => {
//   try {
//     // const { title, _id } = req.body;

//     const API_KEY = "h2wqWRLKuOXm6B6be8VYR4NE0wA0Cvjw";
//     const PATH_TO_FILE = `./assets/${title}.mp4`;

//     // Check if file exists
//     if (!fs.existsSync(PATH_TO_FILE)) {
//       throw new Error(`File not found: ${PATH_TO_FILE}`);
//     }

//     const sm = new Speechmatics(API_KEY);
//     const inputFile = new Blob([fs.readFileSync(PATH_TO_FILE)]);

//     const transcriptText = await sm.batch.transcribe({
//       input: inputFile,
//       transcription_config: { language: "en" },
//       format: "text",
//     });

//     console.log(transcriptText);

//     const response = await moduleModel.findByIdAndUpdate({ _id }, { transcript: transcriptText });

    
//   } catch (error) {
//     console.error(error);
    
//   }
// };
export const subtitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, _id } = req.body;

    const API_KEY = "h2wqWRLKuOXm6B6be8VYR4NE0wA0Cvjw";
    const PATH_TO_FILE =` ./assets/${title}.mp4`;

    // Check if file exists
    if (!fs.existsSync(PATH_TO_FILE)) {
      throw new Error(`File not found: ${PATH_TO_FILE}`);
    }

    const sm = new Speechmatics(API_KEY);
    const inputFile = new Blob([fs.readFileSync(PATH_TO_FILE)]);

    const transcriptText = await sm.batch.transcribe({
      input: inputFile,
      transcription_config: { language: "en" },
      format: "text",
    });

    console.log(transcriptText);

    const response = await moduleModel.findByIdAndUpdate({ _id }, { transcript: transcriptText });

    res.status(200).send(transcriptText);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// export const subtitleController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     // Fetching files and title
//     const { title, _id } = req.body;
//     const files = req.files?.file;

//     if (!files) {
//       res.status(400).json({
//         success: false,
//         message: "No file uploaded",
//       });
//       return;
//     }

//     // If it's a single file, convert it to an array for consistent handling
//     const filesArray = Array.isArray(files) ? files : [files];

//     // Creating a unique path for each file based on the current timestamp
//     const basePath = pathModule.join(__dirname, "../assets/"); // Use the pathModule here
//     const paths: string[] = [];

//     filesArray.forEach(async (file, index) => {
//       const filename = title + ".mp4";
//       const filePath = pathModule.join(basePath, filename); // Use pathModule.join here

//       // Move the file to the specified path
//       await file.mv(filePath, (err: any) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({
//             success: false,
//             message: "Internal server error while moving file",
//           });
//           return;
//         }
//       });

//       paths.push(filePath);
//     });

//     // const API_KEY = "h2wqWRLKuOXm6B6be8VYR4NE0wA0Cvjw";
//     // const PATH_TO_FILE = `./assets/${title}.mp4`;

//     // const sm = new Speechmatics(API_KEY);
//     // const inputFile = new Blob([
//     //   fs.readFileSync(PATH_TO_FILE),
//     // ]);

//     // sm.batch
//     // .transcribe({ input: inputFile, transcription_config: { language: 'en' }, format: 'text' })
//     // .then(async(transcriptText) => {
//     //   console.log(transcriptText);

//     //   const response=await moduleModel.findByIdAndUpdate({_id},
//     //     {transcript:transcriptText});
//     // })
//     // .catch((error) => {
//     //   console.log(error);
//     //   process.exit(1);
//     // });

//     await subtitle(title);

//     res.status(200).json({
//       success: true,
//       message: "File(s) uploaded successfully",
//       paths: paths,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// };


export const subtitleController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetching files and title
    const { title, _id } = req.body;
    const files = req.files?.file;

    if (!files) {
      res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
      return;
    }

    // If it's a single file, convert it to an array for consistent handling
    const filesArray = Array.isArray(files) ? files : [files];

    // Creating a unique path for each file based on the current timestamp
    const basePath = pathModule.join(__dirname, "../assets/"); // Use the pathModule here
    const paths: string[] = [];

    // Use Promise.all to wait for all file movements to complete
    await Promise.all(
      filesArray.map(async (file) => {
        const filename = title + ".mp4";
        const filePath = pathModule.join(basePath, filename); // Use pathModule.join here

        // Move the file to the specified path
        await file.mv(filePath, (err: any) => {
          if (err) {
            console.error(err);
            res.status(500).json({
              success: false,
              message: "Internal server error while moving file",
            });
            throw err; // Throw the error to stop the execution
          }
        });

        paths.push(filePath);
      })
    )

    // Now that all files are moved, call the subtitle function
    await subtitle(title,_id);

    res.status(200).json({
      success: true,
      message: "File(s) uploaded successfully",
      paths: paths,
    });


  
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
