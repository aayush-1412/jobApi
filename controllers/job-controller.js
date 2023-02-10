import jobModel from "../models/job-model.js";
import jwt from "jsonwebtoken";

export const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  try {
    const job = await jobModel.findOne({
      _id: jobId,
      createdBy: userId,
    });
    if (!job) {
      res.status(404).json({ message: "No job found" });
    } else res.status(200).json(job);
  } catch (error) {
    res.status(404).json(error);
  }
};
export const getAllJobs = async (req, res) => {
  //search and category filter
  const { company, title, sort, select } = req.query;
  let queryObject = { createdBy: req.user.userId };
  if (company) {
    queryObject.company = company;
  }
  if (title) {
    queryObject.title = { $regex: title, $options: "i" };
  }

  try {
    let result = jobModel.find(queryObject);
    //sort
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    }
    //select
    if (select) {
      const selectFilter = select.split(",").join(" ");
      result = result.select(selectFilter);
    }
    const job = await result;
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json(error);
  }
};
export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  try {
    const newJob = await jobModel.create(req.body);

    res.status(202).json({ newJob });
  } catch (error) {
    res.status(404).json(error);
  }
};

export const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: { title, description, company, salary, review, experience },
  } = req;

  try {
    const updatedJob = await jobModel.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedJob) {
      res.status(404).json({ message: "No job found" });
    }
else
    res.status(202).json(updatedJob);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;
  try {
    const deletedJob = await jobModel.findOneAndRemove({
      _id: jobId,
      createdBy: userId,
    });

    if (!deletedJob) {
      res.status(404).json({ message: "No job found" });
    } else res.status(200).json({ message: "Job Deleted Successfully" });
  } catch (error) {
    res.status(404).json(error);
  }
};
