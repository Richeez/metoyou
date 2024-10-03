/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, logOut } from "../../manager/auth/authSlice";
import Cookies from "js-cookie";
import EndPoints from "./http/endPoints";
import { useNavigate } from "react-router-dom";

const baseQuery = fetchBaseQuery({
  baseUrl: EndPoints.ROOT_DOMAIN,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const refreshAccessToken = async (api, extraOptions) => {
  let token;
  let userId;
  const stateToken = api.getState().auth.token;
  const stateId = api.getState()?.auth?.user?._id;
  if (stateToken && stateId) {
    token = stateToken;
    userId = stateId;
  }
  const session = Cookies.get("session");
  token = session ? JSON.parse(session).token : null;
  userId = session ? JSON.parse(session).id : null;

  const persist = JSON.parse(localStorage.getItem("Persist"));

  try {
    if (!persist && !stateToken) {
      api.dispatch(logOut());
      Cookies.remove("session");
      return null;
    }
    const refreshResult = await baseQuery(`/refresh/${userId}`, api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId, // Include the user ID as a parameter
      },
    });

    if (refreshResult?.data) {
      const userData = refreshResult.data;
      //? Update the token in your Redux state
      api.dispatch(setToken(userData.key));
      const access = {
        id: userData.rest._id,
        token: userData.key,
      };
      Cookies.set("session", JSON.stringify(access));

      return userData.key;
    }
    Cookies.remove("session");

    return null; // Return null if refresh fails
  } catch (error) {
    console.error("Error:", error);

    // Handle token refresh failure here (e.g., log the user out)
    await baseQuery(`/logout/${token}`, api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token: token, // Include the user ID as a parameter
      },
    });
    Cookies.remove("session");

    api.dispatch(logOut());

    return null; // Return null if refresh fails
  }
};

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 401) {
      // console.log("Access forbidden. Refreshing token...");

      const newToken = await refreshAccessToken(api, extraOptions);

      if (newToken) {
        console.log("Retrying original request with new token...");
        return baseQuery(args, api, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
      } else {
        console.log("Token expired. Redirecting...");
        Cookies.remove("session");
        window.location.href = "/token_expired";
        // api.dispatch(logOut());
      }
    }

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for other error handling
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});

//? USING AXIOS

// import { createApi } from "@reduxjs/toolkit/query/react";
// import axios from "axios";
// import { setToken, logOut } from "../../manager/auth/authSlice";
// import Cookies from "js-cookie";
// import EndPoints from "./http/endPoints";

// const api = axios.create({
//   baseURL: EndPoints.ROOT_DOMAIN,
//   withCredentials: true,
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const token = await refreshAccessToken();
//         if (token) {
//           originalRequest.headers["Authorization"] = `Bearer ${token}`;
//           return api(originalRequest);
//         } else {
//           logOut();
//           return Promise.reject(error);
//         }
//       } catch (error) {
//         logOut();
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// const refreshAccessToken = async () => {
//   const session = Cookies.get("session");
//   const token = session ? JSON.parse(session).token : null;
//   const userId = session ? JSON.parse(session).id : null;
//   try {
//     const response = await api.get(`/refresh/${userId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         userId: userId,
//       },
//     });
//     const userData = response.data;
//     setToken(userData.key);
//     const access = {
//       id: userData.rest._id,
//       token: userData.key,
//     };
//     Cookies.set("session", JSON.stringify(access));
//     return userData.key;
//   } catch (error) {
//     console.error("Error:", error);
//     await api.get(`/logout/${token}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       params: {
//         token: token,
//       },
//     });
//     logOut();
//     return null;
//   }
// };

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: async (args, api, extraOptions) => {
//     try {
//       const result = await api(args);
//       return result.data;
//     } catch (error) {
//       throw error;
//     }
//   },
//   endpoints: (builder) => ({}),
// });
