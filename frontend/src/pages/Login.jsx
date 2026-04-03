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
    <div className="min-h-[92vh] flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white p-5 sm:p-6 md:p-8 shadow-2xl rounded-2xl border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-300 rounded-lg p-2.5 sm:p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg font-medium transition duration-300 hover:cursor-pointer hover:bg-blue-700 hover:scale-95 hover:shadow-lg active:scale-90">
            Login
          </button>
        </form>
        <div className="flex justify-center mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
          <Link
            className="hover:underline hover:font-semibold hover:scale-105 transition flex gap-1"
            to="/signup"
          >
            Create Account
            <svg
              className="w-3 h-3 -translate-y-[1px]"
              viewBox="0 0 11 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.70985 4.5H7.7804M7.7804 4.5V10.5705M7.7804 4.5L0.780396 11.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
