import axios from "axios";
import EndPoints from "./http/endPoints";

export default axios.create({
  baseURL: EndPoints.ROOT_DOMAIN,
});

export const axiosPrivate = axios.create({
  baseURL: EndPoints.ROOT_DOMAIN,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
export const sendFiles = axios.create({
  baseURL: EndPoints.ROOT_DOMAIN,
  headers: { "Content-Type": "multipart/form-data" },
  withCredentials: true,
});
