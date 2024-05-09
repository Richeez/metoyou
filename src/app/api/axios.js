// /* eslint-disable no-unused-vars */
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

// const axiosInstance = axios.create({
//   baseURL: EndPoints.ROOT_DOMAIN,
//   withCredentials: true,
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers['Authorization'] = `Bearer ${token}`;
//   }
//   return config;
// });

// const refreshAccessToken = async () => {
//   let token;
//   let userId;
//   const session = Cookies.get('session');
//   if (session) {
//     const { token: sessionToken, id: sessionId } = JSON.parse(session);
//     token = sessionToken;
//     userId = sessionId;
//   } else {
//     return null;
//   }

//   try {
//     const response = await axiosInstance.post(`/refresh/${userId}`, { userId });
//     const userData = response.data;
//     Cookies.set('session', JSON.stringify({ id: userData.rest._id, token: userData.key }));
//     return userData.key;
//   } catch (error) {
//     console.error('Error:', error);
//     const token = localStorage.getItem('token');
//     if (token) {
//       await axiosInstance.post(`/logout/${token}`, { token });
//       localStorage.removeItem('token');
//     }
//     return null;
//   }
// };

// const axiosWithReAuth = async (config) => {
//   try {
//     const response = await axiosInstance(config);

//     if (response.status === 401) {
//       const newToken = await refreshAccessToken();

//       if (newToken) {
//         config.headers['Authorization'] = `Bearer ${newToken}`;
//         return axiosInstance(config);
//       } else {
//         console.log('Token refresh failed. Logging out...');
//         localStorage.removeItem('token');
//         return null;
//       }
//     }

//     return response;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };

// export const apiSlice = createApi({
//   baseQuery: async (args, { dispatch, getState }) => {
//     try {
//       return await axiosWithReAuth(args);
//     } catch (error) {
//       console.error('Error:', error);
//       dispatch(logOut());
//       return null;
//     }
//   },
//   endpoints: (builder) => ({}),
// });
