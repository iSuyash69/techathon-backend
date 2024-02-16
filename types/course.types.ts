
import mongoose  from "mongoose";
import modules from './module.types'


export default interface course {
  image_url: string,
  course_name: string,
  course_id?: string,
  modules: mongoose.Schema.Types.ObjectId[],
  tutor_name: string,
  description: string,
  category:string,
  domain:string,
  createdAt:Date,
  email_id:string
}
