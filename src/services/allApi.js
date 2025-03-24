import { serverUrl } from "./serverUrl";
import { commonApi } from "./commonApi";

export const addTask = async (data) => await commonApi("POST", `${serverUrl}/tasks`, data);
export const getAllTasks = async () => {
    const response = await commonApi("GET", `${serverUrl}/tasks`, "");
    return response.data ? response : { data: [] }; // ✅ Prevent null response
};
export const deleteTask = async (id) => await commonApi("DELETE", `${serverUrl}/tasks/${id}`, "");
export const markTaskAsDone = async (id, updatedTask) => {
    return await commonApi("PUT", `${serverUrl}/tasks/${id}`, updatedTask);
};

export const updateTask = async (id, updatedData) => {
    return await commonApi("PUT", `${serverUrl}/tasks/${id}`, updatedData);
};

