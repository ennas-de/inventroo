// redux/features/profile/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./taskActions";

const initialState = {
  tasks: [],
  task: null,
  status: "",
  message: "",
  loading: false,
  error: null,
};

// Load the persisted state from local storage if available
// const persistedState = JSON.parse(localStorage.getItem("persist:root"));
// const updatedInitialState = {
//   ...initialState,
//   ...persistedState?.task, // Use persisted profile state if available
// };

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    updatetaskList: (state, action) => {
      state.tasks = action.payload || [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log("GET TASK FULFILLED:action.payload -", action.payload);

        state.task = action.payload.task;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log("GET TASK REJECTED:action.payload -", action.payload);

        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getTasks.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        console.log("GET TASKS FULFILLED:action.payload -", action.payload);

        state.tasks = action.payload.tasks;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log("GTR :action.payload -", action.payload);

        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        console.log("CTF :action.payload -", action.payload);

        state.task = action.payload.task;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log("CTR :action.payload -", action.payload);

        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        console.log("UTF :action.payload -", action.payload);

        state.tasks = action.payload.task;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log("UTR :action.payload -", action.payload);

        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        console.log("DTF :action.payload -", action.payload);
        state.tasks = state.tasks.filter((task) => task._id !== action.payload);
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        console.log("DTR :action.payload -", action.payload);

        state.status = action.payload.status;
        state.message = action.payload.message;
      });
  },
});

export const { updateTaskList } = taskSlice.actions;

export default taskSlice.reducer;
