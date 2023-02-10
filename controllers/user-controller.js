import userModel from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
 
  try {
      //date is just being used for demo
      // const id= new Date().getDate()
      //try to keep payload small better experience for user
       
        
    const existingEmail = await userModel.findOne({ email });
    const existingUsername= await userModel.findOne({username})
 

    if(!existingEmail&&!existingUsername){

        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
          });
          await newUser.save();
          const token= jwt.sign({userId:newUser._id,name:newUser.username},"mysecretkey",{expiresIn:'30d'})
          res.status(200).json({newUser,token});
    }
    else if(existingEmail && !existingUsername)
    res.status(400).json({ message: "Email exists" });
    else 
    res.status(400).json({message:"Username already taken"})
   
  } catch (error) {
    res.status(404).json(error);
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {

   
  const existingUser = await userModel.findOne({ email });
    if (existingUser && bcrypt.compareSync(password, existingUser.password))
    {
      const token= jwt.sign({userId:existingUser._id,name:existingUser.username},"mysecretkey",{expiresIn:'30d'})
      res.status(200).json({ message: "Login Successfull" ,token});
    }
    
    else
      res.json({
        message:
          "Wrong credentials. If you don't have an account , Register first",
      });
     


  } catch (error) {
    res.status(400).json(error);
  }
};
