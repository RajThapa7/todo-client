import { ReactNode, useEffect } from "react";
import { isAuthenticated } from "../utils/auth";
import { useLocation, useNavigate } from "react-router-dom";

export default function RouteGuard({ children }: { children: ReactNode }) {
  const excludeRoute = ["/login", "/signup"];
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated() && !excludeRoute.includes(location.pathname)) {
      navigate("/login");
    }
  }, [excludeRoute, location.pathname, navigate]);
  return <>{children}</>;
}
