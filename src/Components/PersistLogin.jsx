import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import ReactLoading from "react-loading";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCurrentToken,
  setCredentials,
  setToken,
} from "../manager/auth/authSlice";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [persist] = useLocalStorage("Persist", false);
  const refresh = useRefreshToken({ persist });
  const token = useSelector(getCurrentToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        if (!refresh) {
          setIsLoading(false);
          return;
        }
        const refreshToken = await refresh();
        console.log("🚀 ~ verifyRefreshToken ~ refreshToken:", refreshToken);
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
