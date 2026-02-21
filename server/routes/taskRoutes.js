import express from "express";
import { body } from "express-validator";
import {
  createTask,
  deleteTask,
  getTasks,
  updateTask
} from "../controllers/taskController.js";
import protect from "../middleware/authMiddleware.js";
import handleValidationErrors from "../middleware/validationMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("status")
      .optional()
      .isIn(["pending", "completed"])
      .withMessage("Status must be pending or completed")
  ],
  handleValidationErrors,
  asyncHandler(createTask)
);

router.get("/", asyncHandler(getTasks));

router.put(
  "/:id",
  [
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty"),
    body("status")
      .optional()
      .isIn(["pending", "completed"])
      .withMessage("Status must be pending or completed")
  ],
  handleValidationErrors,
  asyncHandler(updateTask)
);

router.delete("/:id", asyncHandler(deleteTask));

export default router;
