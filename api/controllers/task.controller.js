import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import TaskModel from "../models/Task.model.js";
import localLogger from "../utils/localLogger.js";

// get single post
export const getTask = asyncHandler(async (req, res, next) => {
  try {
    let taskId = req.params.taskId;
    // console.log("taskId -", taskId);

    const task = await TaskModel.findById({ _id: taskId });

    if (!task)
      return res.status(404).json({
        status: "failed",
        message: "No record found.",
      });

    task &&
      res.status(201).json({
        status: "success",
        message: "Task fetched successfully",
        task,
      });
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// get all posts by user
export const getTasks = asyncHandler(async (req, res, next) => {
  try {
    let tasks = await TaskModel.find();

    if (tasks.length < 1)
      return res.status(200).json({
        status: "success",
        message: "No tasks yet",
        tasks: [],
      });

    res.status(200).json({
      status: "success",
      message: "Tasks fetched",
      tasks,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// create post
export const createTask = asyncHandler(async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
      return res.status(400).json({
        status: "failed",
        message: "Title and Description are required",
      });

    const titleFiltered = title.toLowerCase();
    const descriptionFiltered = description.toLowerCase();

    let newTask = await TaskModel({
      title: titleFiltered,
      description: descriptionFiltered,
    });

    try {
      let savedTask = await newTask.save();

      res.status(200).json({
        status: "success",
        message: "New task created!",
        savedTask,
      });
    } catch (err) {
      localLogger.error(err.message);
      console.log(err.message);

      return res.status(400).json({
        status: "failed",
        message: "Error ocurred.",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// update patch
export const updateTask = asyncHandler(async (req, res, next) => {
  try {
    let taskId = req.params.taskId;
    let { taskStatus } = req.body;
    // console.log("taskStatus -", taskStatus);

    const acceptedOptions = ["Pending", "In Progress", "Completed"];

    let foundTask = await TaskModel.findOne({ _id: taskId });

    if (!foundTask)
      return res.status(404).json({
        status: "failed",
        message: "Record not found.",
      });

    if (!acceptedOptions.includes(taskStatus))
      return res.status(400).json({
        status: "failed",
        message: "Invalid, please select a valid task status",
      });

    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      {
        status: taskStatus,
      },
      { new: true }
    );

    console.log(updatedTask);

    res.status(200).json({
      status: "success",
      message: "Task updated.",
      updatedTask,
    });
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// delete a post
export const deleteTask = asyncHandler(async (req, res, next) => {
  try {
    let taskId = req.params.taskId;

    let foundTask = await TaskModel.findOne({ _id: taskId });

    console.log(foundTask);

    if (!foundTask)
      return res.status(404).json({
        status: "failed",
        message: "Record not found.",
      });

    try {
      await TaskModel.findByIdAndDelete(taskId);

      res.status(200).json({
        status: "success",
        message: "Task deleted.",
      });
    } catch (err) {
      localLogger.error(err.message);
      console.log(err.message);

      return res.status(400).json({
        status: "failed",
        message: "Error ocurred.",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});
