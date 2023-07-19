import express from "express";
// import v1 routes
// import authRoutes from "./auth.routes.js";
// import profileRoutes from "./user.routes.js";
import taskRoutes from "./task.routes.js";
// import { authenticateAccessToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

// router.use("/auth", authRoutes);
// router.use("/user", authenticateAccessToken, profileRoutes);
router.use("/tasks", taskRoutes);

export default router;
