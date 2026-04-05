import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Swal.fire({
        title: "Error!",
        text: "Please fill in all fields",
        icon: "error",
        confirmButtonColor: "#2563eb",
      });
      return;
    }
    Swal.fire({
      title: "Account Created!",
      text: "You have successfully signed up.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex justify-center items-center grow lg:min-h-[92vh] px-4 bg-gray-100">
      <div className="w-full max-w-md mx-auto mt-10 bg-gray-100 p-6 drop-shadow-2xl rounded-2xl transform -translate-y-6 border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full border border-gray-400 rounded p-2 mb-3 outline-none focus:border-blue-600"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full border border-gray-400 rounded p-2 mb-3 outline-none focus:border-blue-600"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:cursor-pointer hover:bg-blue-700 hover:scale-95 transition-transform hover:shadow-lg"
          >
            Create Account
          </button>
        </form>
        <div className="flex justify-center mt-4 sm:mt-6 text-sm sm:text-base text-gray-600">
          <Link
            className="hover:underline hover:font-semibold hover:scale-105 transition flex gap-1"
            to="/login"
          >
            Already has Account
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

export default Signup;
