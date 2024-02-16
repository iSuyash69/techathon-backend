import express from "express";
import { Request,Response } from "express";
import dbConnect  from "../config/database";
import routes from '../routes/auth.routes';
import cookieparser from 'cookie-parser'
import commentroute from '../routes/community.routes';
import fileupload from 'express-fileupload'
import { cloudinaryConnect } from "../config/cloudinary";
import fileUploadRouter from '../routes/upload.routes';
import courseroutes from '../routes/course.routes';
import mycourse from "../routes/mycourse.routes";
import cors from 'cors';

const app=express();
app.use(express.json());
require('dotenv').config();
app.use(cookieparser());
app.use(cors());
app.use(fileupload({
    useTempFiles:true,
    tempFileDir:'/tmp/ '
}));
const port=process.env.PORT || 8080;



dbConnect();
cloudinaryConnect();
app.use('/',routes);
app.use('/',commentroute); 
app.use('/',fileUploadRouter);
app.use('/',courseroutes);
app.use('/',mycourse);
 
app.listen(port,()=>{
    console.log("listening to the port "+ port );
}) 

app.get('/', (req:Request ,res:Response)=>{

    res.status(200).send('<h1>welcomme</h1>')

})



      






























