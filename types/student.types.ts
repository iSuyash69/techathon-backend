import mongoose from "mongoose";

export default interface student{
    name?:string,
    email_id:string,
    password:string,
    token?:string,
    role:string,
    courses?:mongoose.Schema.Types.ObjectId[],
    community?:mongoose.Schema.Types.ObjectId[]
}