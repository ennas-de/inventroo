import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useParams, Link } from "react-router-dom";
import { updateTask, getTask } from "../../../redux/features/task/taskActions";
import Dropdown from "../../../widgets/layout/DropDown";

import "./EditTask.css";

const EditTask = () => {
  // hooks
  const dispatch = useDispatch();

  // get task id from params
  let params = useParams();
  const taskId = params.taskId;

  // options
  const options = ["Pending", "In Progress", "Completed"];

  const [taskStatus, setTaskStatus] = useState(options[0]);

  // local state

  // fetch task data
  useEffect(() => {
    dispatch(getTask(taskId));
  }, [dispatch, taskId]);

  // fetch task data
  const { task, loading, error, status, message } = useSelector(
    (state) => state.task
  );

  const handleUpdateTask = (e) => {
    e.preventDefault();
    console.log(taskStatus);
    dispatch(updateTask({ taskId, taskStatus }));

    setTimeout(() => {
      window.location.replace("/");
    }, 1000);
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
          <h2 className="heading">Edit Post</h2>
          {task && (
            <div>
              <form
                onSubmit={handleUpdateTask}
                style={{ alignItems: "center" }}
                className="mt-4">
                <Dropdown
                  options={options}
                  placeholder="Select..."
                  onSelect={(option) => setTaskStatus(option)}
                />
                <button className="button">Update Task</button>
              </form>
              <div className="mt-9">
                <Link className="underline" to={`${taskPath}`}>
                  Back to Tasks
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditTask;
