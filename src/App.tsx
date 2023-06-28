import "./App.css";
import Login from "./pages/login";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Todos from "./pages/todos";
import { isAuthenticated } from "./utils/auth";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated() ? "/todos" : "/login"} replace />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
