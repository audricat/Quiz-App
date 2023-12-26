import { Outlet, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { UserAUth } from "../context/UserContext";
import { useEffect } from "react";

const PrivateRoute = () => {
  const { user } = UserAUth();
  const location = useLocation();
  useEffect(() => {
    window.addEventListener('beforeunload', alertUser)
    window.addEventListener('unload', handleTabClosing)
    return () => {
        window.removeEventListener('beforeunload', alertUser)
        window.removeEventListener('unload', handleTabClosing)
    }
})

const handleTabClosing = () => {
  const storageName = [ "users_answers","bbqa_user" , "instructions"];
      for (let store of storageName) {
        localStorage.removeItem(store);
      }
}

const alertUser = (event) => {
    event.preventDefault()
    event.returnValue = ''
}

  return user.isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
