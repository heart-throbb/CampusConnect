import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import Swal from "sweetalert2";
import { API_URL } from "../config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(loginSuccess({ token: data.token, user: data.user }));
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${data.user.name}!`,
          timer: 1500,
          showConfirmButton: false,
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.message || "Invalid email or password",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the server",
      });
    }
  };

  return (
    <div className="min-h-[92vh] flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white p-6 shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Email"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 bg-gray-50 rounded-lg p-3 mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition duration-300 hover:cursor-pointer hover:bg-blue-700 hover:scale-[0.98] hover:shadow-lg">
            Login
          </button>
        </form>
        <div className="flex justify-center mt-6 text-sm text-gray-600">
          <Link
            className="hover:underline hover:font-semibold hover:text-blue-600 transition flex gap-1 items-center"
            to="/signup"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
