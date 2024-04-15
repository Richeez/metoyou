import axios from "axios";
import { apiService } from "../../../strings";

export default axios.create({
  baseURL: apiService.BASE_URI,
});

export const axiosPrivate = axios.create({
  baseURL: apiService.BASE_URI,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const sendFiles = axios.create({
  baseURL: apiService.BASE_URI,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});
