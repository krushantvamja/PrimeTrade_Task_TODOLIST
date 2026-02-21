const TaskItem = ({ task, onEdit, onDelete, onToggleStatus }) => (
  <div className="rounded-lg border border-slate-200 bg-white p-4">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3
          className={`text-sm font-semibold ${
            task.status === "completed" ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {task.title}
        </h3>
        {task.description ? <p className="mt-1 text-sm text-slate-600">{task.description}</p> : null}
      </div>
      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${
          task.status === "completed" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {task.status}
      </span>
    </div>
    <div className="mt-3 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onToggleStatus(task)}
        className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200"
      >
        Mark {task.status === "completed" ? "Pending" : "Completed"}
      </button>
      <button
        type="button"
        onClick={() => onEdit(task)}
        className="rounded-md bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200"
      >
        Edit
      </button>
      <button
        type="button"
        onClick={() => onDelete(task._id)}
        className="rounded-md bg-red-100 px-3 py-1 text-xs font-medium text-red-700 hover:bg-red-200"
      >
        Delete
      </button>
    </div>
  </div>
);

export default TaskItem;
