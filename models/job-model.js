import mongoose from "mongoose";
const jobSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    salary:{
        type:Number,
    },
    review:{
        type:Number,
    },
    experience:{
        type:Number,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:[true,"Please provide user"]
    }
    
},{timestamps:true})

const jobModel=mongoose.model('job',jobSchema)
export default jobModel