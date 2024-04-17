import { useSelector } from "react-redux";
import { axiosPrivate } from "../app/api/axios";
import { selectCurrentUserId } from "../manager/auth/authSlice";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export const useRefreshToken = ({ persist }) => {
  let userId;
  userId = useSelector(selectCurrentUserId);
  if (!persist) return false;

  if (!userId) {
    userId = Cookies.get("sessionId");
  }
  const refresh = async () => {
    try {
      const response = await axiosPrivate.get(`/refresh/${userId}`);

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

useRefreshToken.propTypes = {
  persist: PropTypes.bool,
};
export default useRefreshToken;
