import { Request, Response } from "express";
import fileUploadModel from "../models/fileUpload.model";
import pathModule from "path";
// import cloudinary from "cloudinary";
// cloudinary.v2;
const cloudinary = require("cloudinary").v2;
export const fileUploadController = async (
  req: Request,
  res: Response
): Promise<void> => {};

export const videoUploadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

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

    const fileData = await fileUploadModel.create({
      name: name,
      fileUrl: response.secure_url,
      tags: tags,
      email: email,
    });
    res.json({
      success: true,
      message: "video uploaded successfully",
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

export const imageUploadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const files = req.files?.imageFile;
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
    const supportedTypes = ["jpg", "jpeg", "png"];

    const filetype = file.name.split(".")[1].toLowerCase();
    if (!isFileSupportedTypes(filetype, supportedTypes)) {
      res.status(401).json({
        success: false,
        data: "bad request",
        message: "file format not supported",
      });
      return;
    }

    // file format supported
    const response = await uploadFileTOCloudinary(file, "edtech");

    const fileData = await fileUploadModel.create({
      name: name,
      fileUrl: response.secure_url,
      tags: tags,
      email: email,
    });
    res.json({
      success: true,
      message: "image uploaded successfully",
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

// export const localFileUploadController = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     // Fetching files
//     const {title}=req.body;
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
//     const basePath = __dirname + "/files/";
//     const paths: string[] = [];

//     filesArray.forEach((file, index) => {
//       const path = `${basePath}${Date.now()}_${index}_${file.name}`;

//       // Move the file to the specified path
//       file.mv(path, (err: any) => {
//         if (err) {
//           console.error(err);
//           res.status(500).json({
//             success: false,
//             message: "Internal server error while moving file",
//           });
//           return;
//         }
//       });

//       paths.push(path);
//     });

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

export const localFileUploadController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetching files and title
    const { title } = req.body;
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

    filesArray.forEach(async (file, index) => {
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
          return;
        }
      });

      paths.push(filePath);
    });

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
