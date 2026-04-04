import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost } from "../store/postSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.user?.email);
  const rawPosts = useSelector((state) => state.posts.items);
  const postsStatus = useSelector((state) => state.posts.status);

  const posts = [...rawPosts]
    .filter((post) => post.user?.email === currentUser)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);
  const handleClick = () => {
    Swal.fire({
      icon: "info",
      title: "Feature Coming Soon 🚀",
      text: "Backend not connected yet",
      confirmButtonColor: "#2563eb",
    });
  };

  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(postId)).then(() => {
           Swal.fire("Deleted!", "Your post has been deleted.", "success");
        });
      }
    });
  };

  return (
    <div className="min-h-[92vh] bg-gray-100">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard</h2>
        <button
          onClick={handleClick}
          className="bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base hover:cursor-pointer hover:bg-green-700 hover:scale-90 duration-300 hover:shadow-lg transition"
        >
          Post Query
        </button>
        <div className="flex flex-col gap-5 mt-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-100 p-4 sm:p-5 shadow-lg rounded border border-gray-200 hover:scale-110 transition hover:shadow-xl duration-300"
            >
              <h3 className="font-bold text-lg sm:text-xl mb-2">{post.title}</h3>
              <p className="text-gray-700 text-sm sm:text-base mb-4">
                {post.content}
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs sm:text-sm text-gray-500 mt-4 pt-4 border-t">
                <div>
                  <span className="font-medium text-gray-800">
                    By: {post.user?.email === currentUser ? "You" : "Anonymous User"}
                  </span>
                  <span className="mx-2 hidden sm:inline">•</span>
                  <span className="block sm:inline">
                    {new Date(post.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeletePost(post._id)}
                    className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-red-600 transition duration-300 hover:scale-90 hover:cursor-pointer"
                  >
                    Delete
                  </button>
                  <Link
                    to={`/posts/${post._id}`}
                    className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-blue-700 transition duration-300 hover:scale-90 hover:cursor-pointer"
                  >
                    View Answers
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
