import mongoose from "mongoose";
const dbconnection=()=>
mongoose.connect("mongodb://localhost:27017/jobApi")
.then(()=>console.log("Db connected"))
.catch((error)=>console.log(error))

export default dbconnection