import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentToken } from "./manager/auth/authSlice";
import PersistLogin from "./Components/PersistLogin";
import UserProfile from "./modules/user/pages/userProfile";
import LoginPage from "./modules/auth/pages/loginpage/loginPage";
import SignUpPage from "./modules/common/pages/signupPage/signUp";
import ExpSession from "./modules/common/pages/expired/ExpSession";
import NotFound from "./modules/common/pages/404-Page/NotFound";
import MainContent from "./layouts/main/main";

//TODO: integrate Posting
//TODO: Create profile edit UI
//TODO: set Action to update profile details
//TODO: Fetch all posts
//TODO: Get user friends and display on list
//TODO:  1ntegrate likes
//TODO:  1ntegrate comments

function App() {
  const ProtectedRoutes = () => {
    const token = useSelector(getCurrentToken);

    const location = useLocation();

    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
  };
  return (
    <main className="App">
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<MainContent />} />
            <Route path="/profile/:userId" element={<UserProfile />} />
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/token_expired" element={<ExpSession />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
