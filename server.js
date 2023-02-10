import express from "express"
import cors from "cors"
import userRouter from "./routes/user-route.js";
import jobRouter from "./routes/job-route.js";
import mongoose from "mongoose";
import authenticateUser from "./middleware/auth.js";
import helmet from "helmet";
import xss from "xss-clean"
import rateLimiter from "express-rate-limit"
const app=express()
app.set('trust proxy',1)
app.use(rateLimiter({
    windowMs:15*60*1000,
    max:100,
}))
app.use(express.json())

app.use(helmet())
app.use(cors())
app.use(xss())












//db connection
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/jobApi")
.then(()=>console.log("Db connected"))
.catch((error)=>console.log(error))

app.use("/api/auth",userRouter)
app.use("/api/job", authenticateUser, jobRouter)

app.listen(3500,()=>{
    console.log("Backend is running");
})

