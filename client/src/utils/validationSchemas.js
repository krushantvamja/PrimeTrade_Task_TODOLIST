import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

export const loginSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().required("Password is required")
});

export const taskSchema = yup.object({
  title: yup.string().trim().required("Task title is required"),
  description: yup.string().trim().max(500, "Description is too long"),
  status: yup.string().oneOf(["pending", "completed"])
});
