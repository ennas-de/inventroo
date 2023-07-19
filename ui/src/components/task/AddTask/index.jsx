import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link, useNavigate } from "react-router-dom";
import { createTask } from "../../../redux/features/task/taskActions";

import "./AddTask.css";

const AddPost = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // local state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const { user } = useSelector((state) => state.auth);
  // const userId = user._id;

  const { status, message, loading } = useSelector((state) => state.task);

  useEffect(() => {
    if (status === "success" && message === "New task created!") {
      // window.location.replace(`/`);
      navigate("/");
    }
  }, [status, message, navigate]);

  const handleCreateTask = (e) => {
    e.preventDefault();

    console.log(title, description);
    dispatch(createTask({ title, description }));
    console.log("Creating task");
  };

  const taskPath = generatePath(`/`); // Generate the dynamic path

  return (
    <div>
      {loading ? (
        <div>
          <p>Loading tasks...</p>
        </div>
      ) : (
        <div>
          <h2 className="heading">Add New Task</h2>

          <div>
            <form
              onSubmit={handleCreateTask}
              style={{ alignItems: "center" }}
              className="mt-4">
              <input
                type="text"
                name="title"
                value={title}
                className="input"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title..."
              />
              <br />
              <input
                type="text"
                name="description"
                value={description}
                className="input"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter some contents..."
              />
              <br />

              <button className="button">Create Task</button>
            </form>
            <div className="mt-9">
              <Link to={`${taskPath}`}>Back to Tasks</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
