

/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setToken, logOut } from "../../manager/auth/authSlice"
import { BASE } from "../../../strings"

const baseQuery = fetchBaseQuery({
    baseUrl: BASE.URI,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }

        return headers
    },
    
})

const refreshAccessToken = async (api, extraOptions) => {
  try {
    const token = api.getState().auth.token;
    const refreshResult = await baseQuery("/refresh", api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (refreshResult?.data) {
      const newAccessToken = refreshResult.data;
      // Update the credentials in your Redux state
      api.dispatch(setToken(newAccessToken));
      return newAccessToken;
    }

    return null; // Return null if refresh fails
  } catch (error) {
    console.error("Error:", error);

    // Handle token refresh failure here (e.g., log the user out)
    api.dispatch(logOut());

    return null; // Return null if refresh fails
  }
};

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 403) {
      console.log("Access forbidden. Refreshing token...");

      const newToken = await refreshAccessToken(api, extraOptions);

      if (newToken) {
        console.log("Retrying original request with new token...");
        api.setHeader("Authorization", `Bearer ${newToken}`);
        return baseQuery(args, api, extraOptions);
      } else {
        console.log("Token refresh failed. Logging out...");
        api.dispatch(logOut());
        return "Your login session has expired!";
      }
    }

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Rethrow the error for other error handling
  }
};

// const refreshAccessToken = async (api, extraOptions) => {
//     console.log("🚀 ~ file: apiSlice.js:24 ~ refreshAccessToken ~ extraOptions:", extraOptions)
//     console.log("🚀 ~ file: apiSlice.js:24 ~ refreshAccessToken ~ api:", api)
//     try {
//       const token = api.getState().auth.token;
//       console.log("🚀 ~ file: apiSlice.js:26 ~ refreshAccessToken ~ token:", token)
//       const refreshResult = await baseQuery("/refresh", api, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//         // const refreshResult = await baseQuery("/refresh", api, extraOptions);
//         console.log("New Token:", refreshResult.data);

//         if (refreshResult?.data) {

//           const rest = api.getState().auth.user

//             console.log("🚀 ~ file: apiSlice.js:26 ~ refreshAccessToken ~ refreshResult?.data:", refreshResult?.data)
//             const newAccessToken = refreshResult.data;
//             // const newAccessToken = refreshResult.data.accessToken;
//             // const newRefreshToken = refreshResult.data.refreshToken;

//             // Update the credentials in your Redux state
//             api.dispatch(setCredentials({ ...newAccessToken, rest }));

//             return newAccessToken;
//         }

//         return null; // Return null if refresh fails
//     } catch (error) {
//         console.log("🚀 ~ file: apiSlice.js:119 ~ refreshAccessToken ~ error:", error)

//         // Handle token refresh failure here (e.g., log the user out)
//         api.dispatch(logOut());

//         return null; // Return null if refresh fails
//     }
// };


//  const baseQueryWithReAuth = async (args, api, extraOptions) => {
//   let result = null;
//   let newToken = null; // Initialize newToken variable

//   try {
//     result = await baseQuery(args, api, extraOptions);
//     console.log("🚀 ~ file: apiSlice.js:110 ~ baseQueryWithReAuth ~ api:", api)
//     console.log("🚀 ~ file: apiSlice.js:110 ~ baseQueryWithReAuth ~ extraOptions:", extraOptions)
//     console.log("🚀 ~ file: apiSlice.js:110 ~ baseQueryWithReAuth ~ args:", args)
//     console.log("Result:", result);

//     // Handle various error scenarios
//     if (result?.error?.originalStatus === 403) {
//       console.log("Access forbidden. Refreshing token...");
      
//       newToken = await refreshAccessToken(api, extraOptions);
//       console.log("New Token:", newToken);

//       if (newToken) {
//         console.log("Retrying original request with new token...");
//         api.setHeader("authorization", `Bearer ${newToken}`);
//         result = await baseQuery(args, api, extraOptions);
//       } else {
//         console.log("Token refresh failed. Logging out...");
//         api.dispatch(logOut());
//         return "Your login session has expired!";
//       }
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     throw error; // Rethrow the error for other error handling
//   }

//   return result;
// };


export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: builder => ({})
})



// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { setCredentials, logout } from "../../manager/auth/authSlice";
// import { BASE } from "../../../strings";

// const baseQuery = fetchBaseQuery({
//   baseUrl: BASE.URI,
//   credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.token;
//     if (token) {
//       headers.set("authorization", `Bearer ${token}`);
//     }

//     return headers;
//   }
// });

// const refreshAccessToken = async (dispatch, getState) => {
//   try {
//     const refreshResult = await baseQuery("/refresh");
//     console.log("New Token:", refreshResult.data);

//     if (refreshResult?.data) {
//       const newAccessToken = refreshResult.data.accessToken;
//       const newRefreshToken = refreshResult.data.refreshToken;

//       // Update the credentials in your Redux state
//       dispatch(setCredentials({ accessToken: newAccessToken, refreshToken: newRefreshToken }));

//       return newAccessToken;
//     }

//     return null; // Return null if refresh fails
//   } catch (error) {
//     console.error("Error refreshing token:", error);
//     return null; // Return null if refresh fails
//   }
// };

// const retryRequest = async (config, newToken) => {
//   config.headers.set("authorization", `Bearer ${newToken}`);
//   const response = await fetch(config.url, config);
//   if (!response.ok) {
//     throw new Error(response.statusText);
//   }
//   return response.json();
// };

// export const apiSlice = createApi({
//   baseQuery: async (args, api, extraOptions) => {
//     let newToken = null;

//     try {
//       return await baseQuery(args, api, extraOptions);
//     } catch (error) {
//       if (error.status === 403) {
//         console.log("Access forbidden. Refreshing token...");
//         newToken = await refreshAccessToken(api.dispatch, api.getState);

//         if (newToken) {
//           console.log("Retrying original request with new token...");
//           return await retryRequest(error.config, newToken);
//         } else {
//           console.log("Token refresh failed. Logging out...");
//           api.dispatch(logout());
//           throw new Error("Token refresh failed");
//         }
//       } else {
//         throw error;
//       }
//     }
//   },
//   endpoints: (builder) => ({})
// });
