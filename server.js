import express from "express";
import cors from "cors";
import userRouter from "./routes/user-route.js";
import jobRouter from "./routes/job-route.js";
import mongoose from "mongoose";
import authenticateUser from "./middleware/auth.js";
import helmet from "helmet";
import xss from "xss-clean";
import rateLimiter from "express-rate-limit";
import dotenv from "dotenv";
const app = express();
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use(express.json());

app.use(helmet());
app.use(cors());
app.use(xss());
dotenv.config();

//db connection
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Db connected"))
  .catch((error) => console.log(error));
app.get("/", (req, res) => {
  res.status(200).json(
    { "Welcome to JobApi": "https://github.com/aayush-1412/jobApi" ,
    
      "How to Use? Concatenate this routes at the end of https://jobapi.up.railway.app/ -":
        
          {
            "Login (Post route)": "/api/auth/login",
            "Register (Post route) ": "/api/auth/register",
            "Create Job (Post route) ": "/api/job/create",
            "All job (Get route)": "/api/job/all",
            "Single job (Get route)": "/api/job/:id",
            "Update job (Patch route)": "/api/job/update/:id",
            "Delete job (Delete route)": "/api/job/delete/:id",
          },
        
    }
  
  );
});
app.use("/api/auth", userRouter);
app.use("/api/job", authenticateUser, jobRouter);
const PORT = process.env.PORT || 1729;
app.listen(PORT, () => {
  console.log("Backend is running");
});
