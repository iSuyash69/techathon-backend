import mongoose  from "mongoose";
import comments from "../types/chat.types";


const comment=new mongoose.Schema<comments>({
    // community_id:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'community',
    //     required:true
    // },
    username:{
        type:'String',
        required:true,

    },
    body:{
        type:'string',
        required:true
    },
    time:{
        type:Date,
        required:true,
        default:Date.now()
    }


})


export default mongoose.model('chat',comment)