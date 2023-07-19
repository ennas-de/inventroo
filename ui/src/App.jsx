// App.jsx
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; //toast.success/error
// import Auth from "./layouts/auth";
// import Dashboard from "./layouts/dashboard";

// import ProtectedRoutes from "./utils/routing/ProtectedRoutes";
// import Register from "./pages/auth/Register";
// import Login from "./pages/auth/Login";
// import Home from "./pages/dashboard/Home";
// import Profile from "./pages/dashboard/Profile";
// import EditProfile from "./components/profile/EditProfile";
import Task from "./pages/dashboard/Task";
import EditTask from "./components/task/EditTask";
import AddTask from "./components/task/AddTask";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="body">
        <Toaster />
        <Routes>
          <Route path="/" element={<Task />} />
          <Route path="/edit/:taskId" element={<EditTask />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
