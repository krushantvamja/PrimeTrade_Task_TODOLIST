import api from "./axiosInstance";

export const fetchTasksRequest = async () => {
  const { data } = await api.get("/tasks");
  return data;
};

export const createTaskRequest = async (payload) => {
  const { data } = await api.post("/tasks", payload);
  return data;
};

export const updateTaskRequest = async (id, payload) => {
  const { data } = await api.put(`/tasks/${id}`, payload);
  return data;
};

export const deleteTaskRequest = async (id) => {
  const { data } = await api.delete(`/tasks/${id}`);
  return data;
};
