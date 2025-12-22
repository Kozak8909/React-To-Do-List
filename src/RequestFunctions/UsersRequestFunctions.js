import axios from "axios";

axios.defaults.baseURL = "http://localhost:3030";

export const getUsers = async () => {
    const response = await axios.get("/auth");
    return response.data;
}

export const postUsers = async (payload) => {
    await axios.post("/auth", payload);
}