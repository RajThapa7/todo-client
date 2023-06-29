import { ReactNode, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";

const excludeRoute = ["/login", "/signup"];

export default function RouteGuard({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated() && !excludeRoute.includes(location.pathname)) {
      navigate("/login");
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    if (isAuthenticated() && excludeRoute.includes(location.pathname)) {
      navigate("/");
    }
  }, [location.pathname, navigate]);

  return <>{children}</>;
}
