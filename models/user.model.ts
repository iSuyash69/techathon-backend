import mongoose from "mongoose";
import student from "../types/student.types";




const student =new mongoose.Schema<student>({
    name:{
        type:'string',
        required:true
    },
    email_id:{
        type:'string',
        required:true
    },
    password:{
        type:'string',
        required:true,
        
    },
    token:{
        type:"string",
        default:undefined
    },
    role:{
        type:"String",
        required:true
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'course'
    }],
    community:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'community'
        }
    ]
});



export default mongoose.model('student',student);