import userModel from "../models/user-model.js";
import jwt from "jsonwebtoken"
const auth= async (req,res,next)=>{
    const authHeader= req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        res.status(403).json({message:"Authnetication invalid"});
    }
    const token=authHeader.split(' ')[1]

    try {
        const payload=jwt.verify(token,"mysecretkey")
        //attaching to job routes
        req.user= {userId:payload.userId,name:payload.name}
        next()
    } catch (error) {
        res.status(403).json({message:"Authnetication invalid"});
    }
}
export default auth