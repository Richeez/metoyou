import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ReactLoading from "react-loading";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentToken,
  setCredentials,
  setToken,
} from "../manager/auth/authSlice";
import PropTypes from "prop-types";

const PersistLogin = ({ persist }) => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken({ persist });
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        if (!refresh) {
          setIsLoading(false);
          return;
        }
        const refreshToken = await refresh();
        if (!refreshToken) {
          setIsLoading(false);
          return;
        }
        dispatch(setToken(refreshToken?.key));
        dispatch(setCredentials({ ...refreshToken }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    !token ? verifyRefreshToken() : setIsLoading(false);
  }, [dispatch, refresh, token]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="loading-div">
          <ReactLoading type={"bubbles"} color={"#0052cc"} />
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

PersistLogin.propTypes = {
  persist: PropTypes.bool,
};

export default PersistLogin;
