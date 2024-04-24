/* eslint-disable no-unused-vars */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken, logOut } from "../../manager/auth/authSlice";
import { apiService } from "../../../strings";
import Cookies from "js-cookie";

const baseQuery = fetchBaseQuery({
  baseUrl: apiService.BASE_URI,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    // const session = Cookies.get("session");
    // token = session ? JSON.parse(session).token : null;
    const token = getState().auth.token;
    // if (stateToken) {
    //   token = stateToken;
    // }

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
  console.log("persist", persist);

  try {
    if (!persist && !stateToken) {
      api.dispatch(logOut());
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
    api.dispatch(logOut());

    return null; // Return null if refresh fails
  }
};

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  // const location = useLocation();
  try {
    const result = await baseQuery(args, api, extraOptions);

    console.log(
      "🚀 ~ baseQueryWithReAuth ~ result?.error?.originalStatus:",
      result?.error?.originalStatus
    );
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
        console.log("Token refresh failed. Logging out...");

        api.dispatch(logOut());
        return null;
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
