import mongoose from "mongoose";
import module from "../types/module.types";


const moduleSchema= new mongoose.Schema<module>({

    title:{
        type:'string',
        required:true,

    },
    time:{
        type:Date,
        required:true,
        default:Date.now()

    },
    url:{
        type:'string',
        required:true
    },
    transcript:{
        type:'string'
    }

})


export default mongoose.model('module',moduleSchema);


