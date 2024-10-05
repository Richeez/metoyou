import "./signUp.css";
import { FaEyeSlash, FaEye, FaArrowRight } from "react-icons/fa";
// import { BiInfoCircle } from "react-icons/bi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logging } from "../../../../svgs";
import EndPoints from "../../../../app/api/http/endPoints";
import HttpSuccessDataHandler from "../../../../utils/http_success_data_handler";
import HttpErrorHandler from "../../../../utils/http_error_handler";
import { axiosPrivate } from "../../../../app/api/axios";

function SignUpPage() {
  const navigate = useNavigate();

  // ----------------  STATES ------------------
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { fullName, email, password } = newUser;

  const [loadingDiv, setLoadingDiv] = useState(false);

  const [eyesOpen, setEyesOpen] = useState(false);

  // --------------- FUNCTIONS -----------------

  // --- The SignUp function ---
  const signUp = async () => {
    setLoadingDiv(true);

    try {
      const response = await axiosPrivate.post(
        `${EndPoints.ROOT_DOMAIN}/register`,
        JSON.stringify({
          user: fullName.trim(),
          email: email.trim(),
          pwd: password.trim(),
        })
      );

      HttpSuccessDataHandler.getSuccessResponseData(response);
      setLoadingDiv(false);
      navigate("/login");
    } catch (err) {
      setLoadingDiv(false);
      HttpErrorHandler.spitHttpErrorMsg(err);
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

  return (
    <div className="signup-page">
      {loadingDiv ? (
        <div className="loading-div">
          <Logging />
        </div>
      ) : (
        ""
      )}
      <form className="signup-form" onSubmit={(e) => e.preventDefault()}>
        <h2>Sign Up</h2>
        <ul className="signup-ul">
          <li>
            <input
              name="fullName"
              className="input"
              type="text"
              id="fullName"
              value={fullName}
              autoComplete="off"
              onChange={(e) => fillingData(e)}
              placeholder="Full name"
              maxLength={25}
            />
          </li>

          <li>
            <input
              name="email"
              className="input"
              type="email"
              id="email"
              autoComplete="off"
              value={newUser.email}
              onChange={(e) => fillingData(e)}
              placeholder="Email"
            />
          </li>

          <li>
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
                  placeholder="A strong password"
                />
              )}

              {newUser.password.length !== 0 && (
                <span className="switchEye" onClick={toggleEye}>
                  {eyesOpen ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}

              {/* <span className="pass-info">
                {" "}
                <BiInfoCircle /> password must be 6 or more characters
              </span> */}
            </div>
          </li>
        </ul>

        <div className="btn">
          <button className="signup-btn" onClick={signUp}>
            Sign up
          </button>
        </div>

        <p>
          Already have an account? &nbsp;
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
