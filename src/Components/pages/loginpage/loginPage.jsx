/* eslint-disable react/no-unescaped-entities */
import "./loginPage.css";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { RiAlarmWarningFill } from "react-icons/ri";
import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../manager/auth/authSlice";
import { useLoginMutation } from "../../../manager/auth/authApiSlice";
import { Logging } from "../../../svgs";

function LoginPage() {
  const [eyesOpen, setEyesOpen] = useState(false);
  const errRef = useRef(null);

  // const { setAuth } = useAuth();

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {}, [errorMsg]);
  const { username, password } = userInfo;
  // --- onchange function for filling the user info ---
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
  const [login, { isLoading }] = useLoginMutation();

  // --- The Login function ---
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({
        user: username.trim(),
        pwd: password.trim(),
      }).unwrap();
      dispatch(setCredentials({ ...userData }));
      console.log(userData);
      setUserInfo({
        username: "",
        password: "",
      });
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      if (!err) {
        setErrorMsg("No Server Response");
      } else if (err?.status === 400) {
        setErrorMsg(`Missing Username,\n \n Email or Password`);
      } else if (err?.originalStatus === 401) {
        setErrorMsg("Unauthorized");
      } else {
        setErrorMsg(err?.data?.message || "Login Failed");
      }
      setTimeout(() => {
        setErrorMsg("");
      }, 5000);
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
        <div className="error">
          <p ref={errRef} className={`${errorMsg ? "otherError" : "offSet"}`}>
            <RiAlarmWarningFill /> {errorMsg}
          </p>
        </div>

        <ul className="login-ul">
          <li>
            <label className="label" htmlFor="username">
              Full Name
            </label>
            <input
              name="username"
              className="input"
              type="text"
              id="username"
              value={username}
              autoComplete="off"
              onChange={(e) => fillingData(e)}
              placeholder="username"
            />
          </li>

          <li>
            <label className="label" htmlFor="password">
              Password
            </label>

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

              <span
                className="forget-password"
                onClick={() => navigate("/forget")}
              >
                Forgot password?
              </span>
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
