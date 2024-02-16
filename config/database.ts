import  mongoose from 'mongoose';      
require('dotenv').config();


const dbConnect= async():Promise<void>=>{
    console.log(process.env.DATABASE_URL);
    mongoose.connect(process.env.DATABASE_URL || '')

    .then(()=>{
        console.log("database has connected successfully");
    }).catch((err)=>{
        console.log("an error ocuured while connecting to the database")
        console.log(err);
    })


    
}

export default dbConnect;