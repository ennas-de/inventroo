import { combineReducers } from "redux";
// import authReducer from "../features/auth/authSlice";
// import userReducer from "../features/user/userSlice";
import taskReducer from "../features/task/taskSlice";

const rootReducer = combineReducers({
  // auth: authReducer,
  // user: userReducer,
  task: taskReducer,
});

export default rootReducer;
