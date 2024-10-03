import { useSelector } from "react-redux";
import { axiosPrivate } from "../app/api/axios";
import { getCurrentUserId } from "../manager/auth/authSlice";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

export const useRefreshToken = ({ persist }) => {
  let userId;
  userId = useSelector(getCurrentUserId);
  if (!persist) return false;

  if (!userId) {
    const session = Cookies.get("session");
    if (!session) return false;
    userId = JSON.parse(session).id;
  }
  const refresh = async () => {
    try {
      const response = await axiosPrivate.get(`/refresh/${userId}`);

      console.log("🚀 ~ refresh ~ response:", response?.data);
      return response?.data?.data; // Return the refresh token
    } catch (error) {
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
