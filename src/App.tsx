import "./App.css";
import Login from "./pages/login";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Todos from "./pages/todos";

function App() {
  console.log(import.meta.env.VITE_BASE_URL, "base url");
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/todos" element={<Todos />} />
        <Route path="/" element={<Navigate to={"/todos"} />} />
      </Routes>
    </>
  );
}

export default App;
