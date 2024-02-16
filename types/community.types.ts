import mongoose from "mongoose";



export default interface community{
    title: string,
    courseId:string,
    chats?:mongoose.Schema.Types.ObjectId[]

}