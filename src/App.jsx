import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { MainContent } from "./Components/user";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./manager/auth/authSlice";
import { LogIn, NotFound, SignUp } from "./Components/pages";
import UserProfile from "./Components/user/widgets/userProfile";
import { useEffect, useState } from "react";
import PersistLogin from "./Components/PersistLogin";

//TODO: integrate Posting
//TODO: Create profile edit UI
//TODO: set Action to update profile details
//TODO: Fetch all posts
//TODO: Get user friends and display on list
//TODO:  1ntegrate likes
//TODO:  1ntegrate comments

// --------------- PROJECT ENDPOINTS ------------------
// API URL -- https://loop-social-server-side.vercel.app/
// REGISTER endpoint -- /register
// REGISTER DATA -- username, email, password
// LOGIN endpoint -- /auth
// LOGIN DATA -- username & password

function App() {
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("Persist")) ?? false
  );

  useEffect(() => {
    localStorage.setItem("Persist", persist);
  }, [persist]);

  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  const ProtectedRoutes = () => {
    // let token = null;
    const token = useSelector(selectCurrentToken);

    const location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
      // return <ExpSession location={location} />;
    }

    return <Outlet />;
  };
  return (
    <main className="App">
      <Routes>
        <Route element={<PersistLogin persist={persist} />}>
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/"
              element={
                <MainContent trustDevice={togglePersist} persist={persist} />
              }
            />
          </Route>
        </Route>
        <Route path="/login" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
