import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { taskSchema } from "../utils/validationSchemas";
import FormError from "./FormError";

const defaultValues = {
  title: "",
  description: "",
  status: "pending"
};

const TaskForm = ({ onSubmit, initialValues, isSubmitting, onCancel }) => {
  const isEditMode = Boolean(initialValues?._id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: initialValues || defaultValues
  });

  useEffect(() => {
    reset(initialValues || defaultValues);
  }, [initialValues, reset]);

  const submitHandler = async (values) => {
    await onSubmit(values);
    if (!isEditMode) {
      reset(defaultValues);
    }
  };

  return (
    <form className="space-y-3 rounded-xl border border-slate-200 bg-white p-4" onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="taskTitle">
          Title
        </label>
        <input
          id="taskTitle"
          type="text"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
          placeholder="Enter task title"
          {...register("title")}
        />
        <FormError message={errors.title?.message} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="taskDescription">
          Description
        </label>
        <textarea
          id="taskDescription"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
          rows={3}
          placeholder="Optional description"
          {...register("description")}
        />
        <FormError message={errors.description?.message} />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="taskStatus">
          Status
        </label>
        <select
          id="taskStatus"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
          {...register("status")}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : isEditMode ? "Update Task" : "Create Task"}
        </button>
        {isEditMode && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
