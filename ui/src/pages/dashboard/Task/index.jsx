import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteTask, getTasks } from "../../../redux/features/task/taskActions";

import "./Task.css";

const Task = () => {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();

  // fetch tasks data
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  // fetch tasks data
  const { tasks, loading, error, status, message } = useSelector(
    (state) => state.task
  );

  // display notifications depending on the type (success or failure)
  useEffect(() => {
    if (error && message && status === "failed" && message !== "No tasks yet") {
      toast.error(message);
    } else if (!error && message && status === "successful") {
      toast.success(message);
    }
  }, [dispatch, error, status, message]);

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId))
      .unwrap()
      .then((deletedTaskId) => {
        console.log("Task deleted:", deletedTaskId);
        toast.success("Task deleted");

        // Fetch the updated tasks after successful deletion
        dispatch(getTasks())
          .unwrap()
          .then(() => {
            console.log("Tasks fetched");
          })
          .catch((error) => {
            console.error("Error fetching tasks:", error);
          });
      })
      .catch((error) => {
        if (error.payload) {
          console.error("Error deleting task:", error.payload);
        } else {
          console.error("Error deleting task:", error);
        }
        // Handle error if delete request fails
      });
  };

  const formatPostedDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();
    return formattedDate + " " + formattedTime;
  };

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2 className="heading">Task Component</h2>

      <Link className="button" to="/add">
        Add New Task
      </Link>
      <hr className="mt-5" />
      {tasks.length === 0 ? (
        <p className="mt-4">No tasks found.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="mt-5 pb-5">
            <div className="mt-2">
              <h3>Title: {task.title}</h3>
              <p>Description: {task.description}</p>
              <p>Status: {task.status}</p>
              <p>Updated Date: {formatPostedDate(task.updatedAt)}</p>
              <p>Created Date: {formatPostedDate(task.createdAt)}</p>
            </div>
            <div className="mt-3 mb-3">
              <Link className="button" to={`/edit/${task._id}`}>
                Edit Task
              </Link>
              <button
                className="button"
                onClick={() => handleDeleteTask(task._id)}>
                Delete Task
              </button>
            </div>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Task;
