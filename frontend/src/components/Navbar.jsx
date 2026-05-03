import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { Menu, X } from "lucide-react";
import Swal from "sweetalert2";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedIn = !!token;

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
        dispatch(logout());
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

  const getDesktopLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `transition hover:scale-110 ${isActive ? "font-bold text-black" : "hover:font-bold"}`;
  };

  const getMobileLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `hover:text-gray-200 ${isActive ? "font-bold text-white" : "text-gray-400"}`;
  };

  return (
    <nav className="shadow-lg sticky top-0 z-50 bg-gray-100 backdrop-blur border-b">
      <div className="px-4 py-3 flex justify-between items-center">
        <Link
          className="font-bold text-xl tracking-wide"
          to="/"
          onClick={handleLinkClick}
        >
          CampusConnect
        </Link>
        <div className="hidden md:flex space-x-6 font-medium">
          <Link className={getDesktopLinkClass("/")} to="/">
            Home
          </Link>
          <Link className={getDesktopLinkClass("/dashboard")} to="/dashboard">
            Dashboard
          </Link>
          <Link className={getDesktopLinkClass("/questions")} to="/questions">
            Questions
          </Link>
          {!loggedIn ? (
            <>
              <Link className={getDesktopLinkClass("/login")} to="/login">
                Login
              </Link>
              <Link className={getDesktopLinkClass("/signup")} to="/signup">
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="hover:text-red-600 transition hover:scale-110 hover:font-bold text-red-500"
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
        <div className="md:hidden bg-gray-800 text-gray-400 px-4 pb-4 pt-2 shadow-inner flex flex-col space-y-4 mt-2">
          <Link
            className={getMobileLinkClass("/")}
            to="/"
            onClick={handleLinkClick}
          >
            Home
          </Link>
          <Link
            className={getMobileLinkClass("/dashboard")}
            to="/dashboard"
            onClick={handleLinkClick}
          >
            Dashboard
          </Link>
          <Link
            className={getMobileLinkClass("/questions")}
            to="/questions"
            onClick={handleLinkClick}
          >
            Questions
          </Link>
          {!loggedIn ? (
            <>
              <Link
                className={getMobileLinkClass("/login")}
                to="/login"
                onClick={handleLinkClick}
              >
                Login
              </Link>
              <Link
                className={getMobileLinkClass("/signup")}
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
