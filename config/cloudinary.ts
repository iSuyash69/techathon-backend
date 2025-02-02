// import cloudinary from 'cloudinary';
    const cloudinary=require("cloudinary").v2
import dotenv from 'dotenv';
dotenv.config();

export   const cloudinaryConnect=():void=>{
try{
    cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    })
}catch(err){
console.log(err);
}
}