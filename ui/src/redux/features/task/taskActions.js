import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";
import axios from "axios";
import { updateTaskList } from "./taskSlice";

// Thunk action to handle fetching Post data
export const getTask = createAsyncThunk(
  "tasks/getTask",
  async (taskId, { rejectWithValue }) => {
    try {
      // const { auth } = getState();
      // const userId = auth.user._id;

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      const response = await axios.get(`${API}/tasks/${taskId}`, config);

      return response.data;
    } catch (error) {
      console.log("getTask err - ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle fetching multiple Posts data
export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      let url = `${API}/tasks`;

      // console.log(url);

      const response = await axios.get(url, config);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle Updating Post data
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ title, description }, { rejectWithValue }) => {
    try {
      // const { auth } = getState();
      // const userId = auth.user._id; // Access the userId from the auth state

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      // console.log(data);

      const response = await axios.post(
        `${API}/tasks`,
        { title, description },
        config
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle Updating Post data
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskStatus }, { rejectWithValue }) => {
    try {
      // console.log("taskId -", taskId);
      // console.log("taskStatus -", taskStatus);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.patch(
        `${API}/tasks/${taskId}`,
        { taskStatus },
        config
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle deleting Post data
export const deleteTask = createAsyncThunk(
  "post/deletePost",
  async (taskId, { dispatch, getState, rejectWithValue }) => {
    try {
      const { task } = getState();
      console.log(task);
      console.log("task.tasks -", task.tasks);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.delete(`${API}/tasks/${taskId}`, config);
      console.log("response -", response);

      // Update the local state or dispatch the action to update the post list
      // let updatedTasks;
      // if (task.tasks.length > 1)
      // const updatedTasks = task.tasks.filter((t) => t._id !== taskId);
      // else updateTask =
      // dispatch(updateTaskList(updatedTasks));

      return response.data;
    } catch (error) {
      console.log("DTR error", error);
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
  // {
  //   rejectValue: (error) => {
  //     if (error.message) {
  //       return error.message;
  //     } else {
  //       return "Something went wrong.";
  //     }
  //   },
  // }
);
