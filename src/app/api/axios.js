import axios from "axios";
const BASE_URL = "http://localhost:4500"

export default axios.create({
    baseURL: BASE_URL
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true
})
export const sendFiles = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true
})