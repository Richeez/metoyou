/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, logOut, setCredentials } from "../../manager/auth/authSlice";
import { apiService } from "../../../strings";

const baseQuery = fetchBaseQuery({
  baseUrl: apiService.BASE_URI,
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
  const token = api.getState()?.auth?.token;
  const userId = api.getState()?.auth?.user?._id;
  try {
    console.log("🚀 ~ refreshAccessToken ~ token:", token);
    console.log("🚀 ~ refreshAccessToken ~ userId:", userId);

    const refreshResult = await baseQuery(`/refresh/${userId}`, api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId, // Include the user ID as a parameter
      },
    });

    if (refreshResult?.data) {
      const newAccessToken = refreshResult.data?.key;
      console.log("newAccessToken", newAccessToken);
      //? Update the token in your Redux state
      api.dispatch(setToken(newAccessToken));
      return newAccessToken;
    }

    return null; // Return null if refresh fails
  } catch (error) {
    console.error("Error:", error);

    // Handle token refresh failure here (e.g., log the user out)
    const logOutResponse = await baseQuery(`/logout/${token}`, api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        token: token, // Include the user ID as a parameter
      },
    });
    console.log("refreshResult", JSON.stringify(logOutResponse));
    api.dispatch(logOut());

    return null; // Return null if refresh fails
  }
};

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);

    console.log(
      "🚀 ~ baseQueryWithReAuth ~ result?.error?.originalStatus:",
      result?.error?.originalStatus
    );
    if (result?.error?.originalStatus === 401) {
      console.log("Access forbidden. Refreshing token...");

      const newToken = await refreshAccessToken(api, extraOptions);
      console.log("newToken", newToken);
      console.log("extraOptions", extraOptions);
      console.log("api", api);
      if (newToken) {
        console.log("Retrying original request with new token...");
        // api.setHeader("Authorization", `Bearer ${newToken}`);

        return baseQuery(args, api, {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        });
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

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
