import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Residents from "./pages/Residents";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        {/* ✅ Toast container should be outside Routes but inside Router */}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    </Router>
  );
}

export default App;
