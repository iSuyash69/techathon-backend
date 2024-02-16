import mongoose from "mongoose";
import community from "../types/community.types";

const community=new mongoose.Schema<community>({
    title:{
        type:'string' ,
        required:true
    },
    courseId:{
        type:String,
        required:true
    },
    chats:[{
        type:mongoose.Schema.Types.ObjectId ,
        ref:'chat'
    }]
    })



export default mongoose.model('community',community);