import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPosts } from "./store/postSlice";
import { API_URL } from "./config";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PostDetails from "./pages/PostDetails";
import Signup from "./pages/Signup";
import Questions from "./pages/Questions";
import CreatePost from "./pages/CreatePost";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // fetchin all pots when app loads
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}/posts`);
        if (response.ok) {
          const data = await response.json();
          dispatch(setPosts(data));
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };
    fetchPosts();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/questions" element={<Questions />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
