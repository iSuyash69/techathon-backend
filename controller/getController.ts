import express,{Request,Response} from 'express';
import mongoose from 'mongoose';
import mymodel from '../models/mymodel';





const getController=async(req:Request,res:Response):Promise<void>=>{
    try{
        const response=await mymodel.find();
        console.log(response)

        res.status(200).json({
            success:true,
            data:response,
            message:'data retrieved successfully'
        })
    }
    catch(err){
        res.status(500).json({
            success:true,
            data:'internal server error ',
            message:'cant retrieve data'
        })
        console.log("internal server error"+ err)
    }
}


export default getController;