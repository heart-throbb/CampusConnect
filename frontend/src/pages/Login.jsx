import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@baka.com" && password === "123") {
      localStorage.setItem("token", "dummy-token");
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "Welcome back!",
        confirmButtonColor: "#2563eb",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="flex justify-center items-center grow lg:min-h-[92vh] bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 drop-shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-5 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white p-2 rounded-lg transition duration-300 hover:bg-blue-700 hover:scale-95 hover:shadow-lg">
            Login
          </button>
        </form>
        <div className="flex justify-center mt-5 gap-1 text-gray-600">
          <Link
            className="hover:underline hover:font-semibold hover:scale-105"
            to="/signup"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
