import express from "express"
import { getAllJobs,createJob,getSingleJob,deleteJob,updateJob } from "../controllers/job-controller.js"
const jobRouter=express.Router()


jobRouter.get("/all",getAllJobs)
jobRouter.get("/:id",getSingleJob)
jobRouter.post("/create",createJob)
jobRouter.patch("/update/:id",updateJob)
jobRouter.delete("/delete/:id",deleteJob)

export default jobRouter
