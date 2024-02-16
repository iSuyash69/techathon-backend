import mongoose from "mongoose";
import file from "../types/fileupload.types";




const fileSchema=new mongoose.Schema<file>({
    name:{
        type:String,
        required:true
    },
    fileUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }

})

export default mongoose.model("fileUpload",fileSchema); 