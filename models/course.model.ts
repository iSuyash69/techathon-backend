import mongoose from "mongoose";
import course from "../types/course.types";

const course = new mongoose.Schema<course>({
  image_url: {
    type: "String",
    required: false,
  },

  course_name:{
    type:'string',
    required:true
  },

  modules:[
   { type:mongoose.Schema.Types.ObjectId,
    ref:'modules',
    required:false
}
,

  ],
  tutor_name:{
    type:'string',
    required:true,
},
description:{
    type:'string',
    required:false
},
category:{
    type:'string',
    required:true
},

domain:{
    type:'String',
    required:true
},

createdAt:{
    type:Date,
    default:Date.now()
},
email_id:{
  type:String,
  required:true
}

});


export default mongoose.model('course',course);