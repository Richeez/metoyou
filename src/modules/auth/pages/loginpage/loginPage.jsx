/* eslint-disable react/no-unescaped-entities */
import "./loginPage.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials, setToken } from "../../../../manager/auth/authSlice";
import { useAuthApi } from "../../../../manager/auth/authApiSlice";
import Cookies from "js-cookie";
import useToggle from "../../../../hooks/useToggle";
import HttpErrorHandler from "../../../../utils/http_error_handler";
import { Logging } from "../../../../svgs";

function LoginPage() {
  const [eyesOpen, setEyesOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  useToggle("persist", true);

  const { username, password } = userInfo;
  const fillingData = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  // --- function for toggling password visibility ---
  const toggleEye = () => {
    setEyesOpen(!eyesOpen);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const { login } = useAuthApi();
  const [loginMutation, { isLoading }] = login;

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginMutation({
        user: username.trim(),
        pwd: password.trim(),
      }).unwrap();

      dispatch(setCredentials({ ...data?.data }));
      dispatch(setToken(data?.data?.key));
      const access = {
        id: data?.data?.user?._id,
        token: data?.data?.key,
      };
      // Setting the cookie
      Cookies.set("session", JSON.stringify(access), {
        path: "/",
        expires: 1, // 1 day
        sameSite: "Strict",
        secure: false, // Set to true if using HTTPS
      });

      // Cookies.set("session", JSON.stringify(access) /*, { expires: 1 / 720 }*/);
      setUserInfo({
        username: "",
        password: "",
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log("🚀 ~ handleLogin ~ err:", err);
      HttpErrorHandler.spitHttpErrorMsg(err);
    }
  };

  return (
    <div className="login-page">
      {isLoading ? (
        <div className="loading-div">
          <Logging />
        </div>
      ) : (
        ""
      )}
      <form className="login-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Login</h2>

        <ul className="login-ul">
          <li>
            <input
              name="username"
              className="input"
              type="text"
              id="username"
              value={username}
              autoComplete="off"
              onChange={(e) => fillingData(e)}
              placeholder="username / nickname"
            />
          </li>

          <li>
            <div className="input-cont">
              {eyesOpen ? (
                <input
                  name="password"
                  className="input eyes"
                  type="text"
                  id="password"
                  value={password}
                  onChange={(e) => fillingData(e)}
                  placeholder="your password"
                />
              ) : (
                <input
                  name="password"
                  className="input eyes"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => fillingData(e)}
                  placeholder="your password"
                />
              )}

              {password?.length !== 0 && (
                <span className="switchEye" onClick={toggleEye}>
                  {eyesOpen ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
              <div className=" due-text-cont ">
                {/* <FileInputWrapper>
                  <input
                    style={{ marginRight: "5px", cursor: "pointer" }}
                    // onChange={togglePersist}
                    checked={persist}
                    name="trust_device"
                    type="checkbox"
                  />
                  <span
                    className="forget-password"
                  >
                    Remember me
                  </span>
                </FileInputWrapper> */}
                <span
                  className="forget-password"
                  onClick={() => navigate("/forget")}
                >
                  Forgot password?
                </span>
              </div>
            </div>
          </li>
        </ul>

        <div className="btn">
          <button
            className="login-btn"
            onClick={handleLogin}
            /* disabled={
              username?.length === 0 || password?.length === 0 ? true : false
            } */
          >
            Login
          </button>
        </div>

        <p className="nav-to-signUp">
          You don't have an account yet? &nbsp;
          <span onClick={() => navigate("/sign-up")} className="sign-word">
            Sign up
          </span>
        </p>
      </form>

      <div className="illustration">
        <h1>Welcome back!</h1>
        <img src="/illustrations/login.png" alt="illustration" />
      </div>
    </div>
  );
}

export default LoginPage;
