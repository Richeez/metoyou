import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import { MainContent } from "./Components/user";
import { useSelector } from "react-redux";
import { getCurrentToken } from "./manager/auth/authSlice";
import { ExpSession, LogIn, NotFound, SignUp } from "./Components/pages";
import UserProfile from "./Components/user/widgets/userProfile";
import PersistLogin from "./Components/PersistLogin";

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
        <Route path="/login" element={<LogIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/token_expired" element={<ExpSession />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
}

export default App;
