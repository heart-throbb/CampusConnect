import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Swal from "sweetalert2";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check token on load (frontend only)
  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        setLoggedIn(false);
        Swal.fire({
          icon: "success",
          title: "Logged out",
          text: "You have been logged out successfully",
          timer: 1500,
          showConfirmButton: false,
        });
        setMenuOpen(false);
        navigate("/login");
      }
    });
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link
          className="font-bold text-xl tracking-wide"
          to="/"
          onClick={handleLinkClick}
        >
          CampusConnect
        </Link>
        <div className="hidden md:flex space-x-6 font-medium">
          <Link
            className="hover:text-gray-400 transition hover:scale-110"
            to="/"
          >
            Home
          </Link>
          <Link
            className="hover:text-gray-400 transition hover:scale-110"
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="hover:text-gray-400 transition hover:scale-110"
            to="/questions"
          >
            Questions
          </Link>
          {!loggedIn ? (
            <>
              <Link
                className="hover:text-gray-400 transition hover:scale-110"
                to="/login"
              >
                Login
              </Link>

              <Link
                className="hover:text-gray-400 transition hover:scale-110"
                to="/signup"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-600 transition hover:scale-110 text-red-500"
            >
              Logout
            </button>
          )}
        </div>
        {/* mobile */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* mob menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-700 px-4 pb-4 flex flex-col space-y-3 mt-2">
          <Link
            className="hover:text-gray-200"
            to="/"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            className="hover:text-gray-200"
            to="/dashboard"
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
          <Link
            className="hover:text-gray-200"
            to="/questions"
            onClick={handleLinkClick}
          >
            Questions
          </Link>
          {!loggedIn ? (
            <>
              <Link
                className="hover:text-gray-200"
                to="/login"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                className="hover:text-gray-200"
                to="/signup"
                onClick={handleLinkClick}
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-500 text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
