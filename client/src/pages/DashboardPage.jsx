import { useEffect, useMemo, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  fetchTasksRequest,
  updateTaskRequest
} from "../api/taskApi";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import useAuth from "../hooks/useAuth";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await fetchTasksRequest();
      setTasks(data);
    } catch (error) {
      setApiError(error.response?.data?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (values) => {
    setApiError("");
    setSaving(true);

    try {
      if (editingTask) {
        const updated = await updateTaskRequest(editingTask._id, values);
        setTasks((prev) => prev.map((task) => (task._id === updated._id ? updated : task)));
        setEditingTask(null);
      } else {
        const created = await createTaskRequest(values);
        setTasks((prev) => [created, ...prev]);
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Task action failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTaskRequest(id);
      setTasks((prev) => prev.filter((task) => task._id !== id));
      if (editingTask?._id === id) {
        setEditingTask(null);
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "Failed to delete task");
    }
  };

  const handleToggleStatus = async (task) => {
    try {
      const updated = await updateTaskRequest(task._id, {
        status: task.status === "completed" ? "pending" : "completed"
      });
      setTasks((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
    } catch (error) {
      setApiError(error.response?.data?.message || "Failed to update task status");
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const searchMatch =
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());

      const filterMatch = filter === "all" ? true : task.status === filter;
      return searchMatch && filterMatch;
    });
  }, [tasks, search, filter]);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-800">Task Dashboard</h1>
            <p className="text-sm text-slate-500">Welcome, {user?.name}</p>
          </div>
          <button
            type="button"
            onClick={logout}
            className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 md:grid-cols-[340px_1fr]">
        <aside className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="text-sm font-semibold text-slate-800">Profile</h2>
            <div className="mt-2 space-y-1 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-700">Name:</span> {user?.name}
              </p>
              <p>
                <span className="font-medium text-slate-700">Email:</span> {user?.email}
              </p>
            </div>
          </div>

          <TaskForm
            onSubmit={handleCreateOrUpdate}
            initialValues={editingTask}
            isSubmitting={saving}
            onCancel={() => setEditingTask(null)}
          />

          {apiError ? <p className="text-sm text-red-600">{apiError}</p> : null}
        </aside>

        <section className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search tasks..."
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
              />
              <select
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-blue-500 focus:ring"
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
              Loading tasks...
            </div>
          ) : (
            <TaskList
              tasks={filteredTasks}
              onEdit={(task) => setEditingTask(task)}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;
