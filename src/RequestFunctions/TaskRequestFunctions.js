import axios from 'axios';

axios.defaults.baseURL = "http://localhost:3030/";

export const fetchTasks = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

export const fetchTask = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

export const addTask = async (url, payload) => {
    await axios.post(url, payload);
}

export const updateTask = async (url, payload) => {
    await axios.patch(url, payload);
}

export const deleteTask = async (url) => {
    await axios.delete(url);
}