import mongoose from "mongoose";


export default interface  comments{
    // community_id:mongoose.Schema.Types.ObjectId,
    username:string,
    body:string,
    time:Date

}