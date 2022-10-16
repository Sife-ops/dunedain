import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuthContext } from "../hook/auth-context";
import { useEffect } from "react";

export const PrivateRoutes: React.FC = () => {
  const location = useLocation();
  const { signedIn } = useAuthContext();

  // if (authLogin === undefined) {
  //   return null; // or loading indicator/spinner/etc
  // }

  useEffect(() => {
    console.log(signedIn);
  }, []);

  return signedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/landing" replace state={{ from: location }} />
  );
};
