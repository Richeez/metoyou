import "./signUp.css";
import axios from "axios";
import { FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa";
import { BiInfoCircle } from "react-icons/bi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiAlarmWarningFill } from "react-icons/ri";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import illustration from '../illustrations/login-illustrate.svg'

// const request = {
//   method: 'POST',
//   url: 'https://loop-social-server-side.vercel.app/auth/login',
//   body: ''
// }

// --------------- PROJECT ENDPOINTS ------------------
// API URL -- https://loop-social-server-side.vercel.app/
// REGISTER endpoint -- /api/auth/register
// REGISTER DATA -- fullname, email, password
// LOGIN endpoint -- /api/auth/login
// LOGIN DATA -- email & password

function SignUpPage() {
  const navigate = useNavigate();

  // ----------------  STATES ------------------
  const [newUser, setNewUser] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { fullname, email, password } = newUser;

  const [errorMessage, setErrorMessage] = useState({
    bool: false,
    message: "",
  });

  const [loadingDiv, setLoadingDiv] = useState(false);

  const [eyesOpen, setEyesOpen] = useState(false);

  // --------------- FUNCTIONS -----------------

  // --- The SignUp function ---
  const signUp = async () => {
    setLoadingDiv(true);

    try {
      const response = await axios.post(
        "https://metoyou-api.vercel.app/api/register",
        JSON.stringify({
          user: fullname.trim(),
          email: email.trim(),
          pwd: password.trim(),
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      setLoadingDiv(false);
      navigate("/login");
    } catch (err) {
      console.log("🚀 ~ file: signUp.jsx:64 ~ signUp ~ err:", err);
      if (!err) {
        setErrorMessage({ bool: true, message: "No Server Response" });
      } else if (err?.response?.status === 400) {
        setErrorMessage({
          bool: true,
          message: `Missing Username,\n \n Email or Password`,
        });
      } else if (err?.response?.status === 409) {
        setErrorMessage({ bool: true, message: "Name or Email Already Exist" });
      } else {
        setErrorMessage({
          bool: true,
          message: err?.message || "Registration Failed",
        });
      }

      setLoadingDiv(false);
    }
  };

  // --- onchange function for filling the new user info ---
  const fillingData = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  // --- function for toggling password visibility ---
  const toggleEye = () => {
    setEyesOpen(!eyesOpen);
  };

  // ----- condition for enabling sign-up button ------
  const condition = () => {
    if (email.length === 0 || password.length < 6 || fullname.length < 4)
      return true;

    return false;
  };

  useEffect(() => {
    condition();
  }, [email, password, fullname]);

  return (
    <div className="signup-page">
      {loadingDiv ? (
        <div className="loading-div">
          <AiOutlineLoading3Quarters
            className="loading-effect"
            style={{ color: "orangeRed" }}
          />
        </div>
      ) : (
        ""
      )}
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Sign Up</h2>
        {errorMessage.bool ? (
          <div className="error">
            <RiAlarmWarningFill /> {errorMessage.message}
          </div>
        ) : (
          ""
        )}
        <ul className="signup-ul">
          <li>
            <label className="label" htmlFor="fullname">
              Full Name
            </label>
            <input
              name="fullname"
              className="input"
              type="text"
              id="fullname"
              value={fullname}
              autoComplete="off"
              onChange={(e) => fillingData(e)}
              placeholder="at least 4 or more characters"
              maxLength={25}
            />
          </li>

          <li>
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              className="input"
              type="email"
              id="email"
              autoComplete="off"
              value={newUser.email}
              onChange={(e) => fillingData(e)}
              placeholder="example@gmail.com"
            />
          </li>

          <li>
            <label className="label" htmlFor="password">
              Password
            </label>

            <div className="signup-input-cont">
              {eyesOpen ? (
                <input
                  name="password"
                  className="input"
                  type="text"
                  id="password"
                  value={newUser.password}
                  onChange={(e) => fillingData(e)}
                  maxLength={22}
                />
              ) : (
                <input
                  name="password"
                  className="input"
                  type="password"
                  id="password"
                  value={newUser.password}
                  onChange={(e) => fillingData(e)}
                  maxLength={22}
                  placeholder="a strong password"
                />
              )}

              {newUser.password.length !== 0 && (
                <span className="switchEye" onClick={toggleEye}>
                  {eyesOpen ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}

              <span className="pass-info">
                {" "}
                <BiInfoCircle /> password must be 6 or more characters
              </span>
            </div>
          </li>
        </ul>

        <div className="btn">
          <button
            className="signup-btn"
            onClick={() => signUp()}
            // disabled={condition()}
          >
            Sign up
          </button>
        </div>

        <p>
          Already have an account?
          <span onClick={() => navigate("/login")} className="log-word">
            Login <FaArrowRight />
          </span>
        </p>
      </form>

      <div className="signup-illustration">
        <h1>Join Us!</h1>
        <img src="illustrations/sign-up.png" alt="illustration" />
      </div>
    </div>
  );
}

export default SignUpPage;
