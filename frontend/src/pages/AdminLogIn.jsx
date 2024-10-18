import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminLogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("admin"); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        username,
        password,
        role,
      });
      
      console.log(res.data.token);
      if (res.data.token) {
        sessionStorage.setItem("adminToken", res.data.token); 
        sessionStorage.setItem("adminRole", role); // Save the role in session storage
        navigate("/admin/dashboard");
      } else {
        throw new Error("Token not provided");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials. Please check your username, password, or role.");
      } else {
        alert("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleLogin} className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
          />
        </div>
        {/* <div className="mb-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="doctor">Doctor</option>
          </select>
        </div> */}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">
          Login
        </button>
      </form>
    </div>
  );
};
