import { useSelector } from "react-redux";
import { axiosPrivate } from "../app/api/axios";
import { selectCurrentUserId } from "../manager/auth/authSlice";
import Cookies from "js-cookie";
export const useRefreshToken = () => {
  let userId;
  userId = useSelector(selectCurrentUserId);
  console.log("userId from useRefresh", userId);
  if (!userId) {
    userId = Cookies.get("sessionId");
    console.log("sessionId from useRefresh", userId);
  }
  const refresh = async () => {
    try {
      const response = await axiosPrivate.get(`/refresh/${userId}`);
      console.log("useRefresh:", response.data);

      return response.data; // Return the refresh token
    } catch (error) {
      // Handle error during refresh token request
      // For example, perform logout or display an error message
      console.log("Error refreshing token:", error);
      // Return null or handle the error accordingly based on your application's logic
      return null;
    }
  };

  return refresh;
};
export default useRefreshToken;
