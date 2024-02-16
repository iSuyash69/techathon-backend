import mongoose from "mongoose";
import {Request,Response} from 'express';
import student from "../types/student.types";
import studentModel from "../models/user.model";
import bcrypt from 'bcrypt'



const signupController=async (req:Request,res:Response):Promise<void>=>{

   try {
    const {name,email_id,password,role }=req.body;

    if(!name || !email_id || !password ||!role)
    {
        res.status(401).json({
            success:false,
            message:"enter valid data ",
            data:"Bad request "
        })
        return;
    }

    const user= await  studentModel.findOne({email_id});
    console.log("hello this is the user" + user)


    if(user){
        res.status(401).json({
            success:false,
            message:"user already exist ",
            data:"Bad request "
        })
        return;

    }

    const hashPassword:string=await bcrypt.hash(password,10);

    const response=await studentModel.create({
        name,
        email_id,
        password:hashPassword,
        role


    })


    response.password='undefined';

    res.status(200).json({
        success:true,
        data:response,
        message:'profile created successfully'

    })
}catch(err){
    
    res.status(500).json({
        success:false,
        data:'internal server error',

        message:'an error occured '
        
    })
    console.log(err);
}

}


export default signupController;