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
  const refresh = useRefreshToken();
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const refreshToken = await refresh();

        console.log("from Persist", refreshToken);
        dispatch(setToken(refreshToken?.key));
        dispatch(setCredentials({ ...refreshToken }));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    !token ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`Token: ${JSON.stringify(token)}`);
  }, [isLoading, token]);

  return (
    <>
      {!persist ? (
        <Outlet />
      ) : isLoading ? (
        <div className="loading-div">
          <ReactLoading type={"bubbles"} color={"#0052cc"} />

          {/* <AiOutlineLoading3Quarters className="loading-effect" /> */}
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
