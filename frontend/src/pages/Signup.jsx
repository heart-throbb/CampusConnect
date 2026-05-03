import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { API_URL } from "../config";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          title: "Account Created!",
          text: "You have successfully signed up. Please login.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: data.message || "An error occurred",
        });
      }
    } catch (error) {
      console.error("Signup error:", error);
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Could not connect to the server",
      });
    }
  };

  return (
    <div className="flex justify-center items-center grow min-h-[50vh] lg:min-h-[92vh] px-4 bg-gray-100">
      <div className="w-full max-w-md mx-auto mt-10 p-6 drop-shadow-2xl rounded-2xl bg-white border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-400 bg-gray-50 rounded p-2 mb-3 outline-none focus:border-blue-600"
            placeholder="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border border-gray-400 bg-gray-50 rounded p-2 mb-3 outline-none focus:border-blue-600"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-400 bg-gray-50 rounded p-2 mb-4 outline-none focus:border-blue-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:bg-blue-700 hover:scale-[0.98] transition-transform hover:shadow-lg font-medium"
          >
            Create Account
          </button>
        </form>
        <div className="flex justify-center mt-6 text-sm text-gray-600">
          <Link
            className="hover:underline hover:font-semibold hover:text-blue-600 transition flex gap-1 items-center"
            to="/login"
          >
            Already have an Account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
