import express from "express";
import { body } from "express-validator";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import handleValidationErrors from "../middleware/validationMiddleware.js";
import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters")
  ],
  handleValidationErrors,
  asyncHandler(registerUser)
);

router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  handleValidationErrors,
  asyncHandler(loginUser)
);

router.get("/profile", protect, asyncHandler(getProfile));
router.put(
  "/profile",
  protect,
  [
    body("name").optional().trim().notEmpty().withMessage("Name cannot be empty"),
    body("email")
      .optional()
      .trim()
      .isEmail()
      .withMessage("Valid email is required")
  ],
  handleValidationErrors,
  asyncHandler(updateProfile)
);

export default router;
