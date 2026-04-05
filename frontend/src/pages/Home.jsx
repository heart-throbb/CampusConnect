import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
  const loggedIn = useSelector((state) => !!state.auth.token);

  return (
    <div className="min-h-[92vh] bg-gray-100 flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center text-center flex-grow py-10 sm:py-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Welcome to CampusConnect
        </h2>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-xl mb-6">
          Connect, collaborate, and share study resources easily.
        </p>
        {loggedIn ? (
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-black bg-gray-100 px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition duration-300 hover:underline hover:scale-110 hover:shadow-lg"
          >
            Go to Dashboard
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
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-2 text-black bg-gray-100 px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition duration-300 hover:underline hover:scale-110 hover:shadow-lg"
          >
            Login & Take Part
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
        )}
      </div>
      <hr className="border-t-2 border-gray-300" />
      <footer className="text-center py-3 text-xs sm:text-sm md:text-base text-gray-600">
        Made with ❤️
      </footer>
    </div>
  );
}

export default Home;
