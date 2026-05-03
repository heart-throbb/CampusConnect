import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { removePost } from "../store/postSlice";
import { AVAILABLE_TAGS } from "../data";
import { API_URL } from "../config";

const TAG_COLORS = {
  DSA: "bg-purple-100 text-purple-700 border-purple-300",
  JavaScript: "bg-yellow-100 text-yellow-700 border-yellow-300",
  TypeScript: "bg-blue-100   text-blue-700   border-blue-300",
  React: "bg-cyan-100   text-cyan-700   border-cyan-300",
  Python: "bg-green-100  text-green-700  border-green-300",
  "C++": "bg-red-100    text-red-700    border-red-300",
  Java: "bg-orange-100 text-orange-700 border-orange-300",
  "AI / ML": "bg-pink-100   text-pink-700   border-pink-300",
  "Web Dev": "bg-indigo-100 text-indigo-700 border-indigo-300",
  Database: "bg-teal-100   text-teal-700   border-teal-300",
  Career: "bg-lime-100   text-lime-700   border-lime-300",
  Other: "bg-gray-200   text-gray-700   border-gray-300",
};

const TAG_ACTIVE = {
  DSA: "bg-purple-500 text-white border-purple-600",
  JavaScript: "bg-yellow-400 text-white border-yellow-500",
  TypeScript: "bg-blue-500   text-white border-blue-600",
  React: "bg-cyan-500   text-white border-cyan-600",
  Python: "bg-green-500  text-white border-green-600",
  "C++": "bg-red-500    text-white border-red-600",
  Java: "bg-orange-500 text-white border-orange-600",
  "AI / ML": "bg-pink-500   text-white border-pink-600",
  "Web Dev": "bg-indigo-500 text-white border-indigo-600",
  Database: "bg-teal-500   text-white border-teal-600",
  Career: "bg-lime-500   text-white border-lime-600",
  Other: "bg-gray-500   text-white border-gray-600",
};

function Dashboard() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user?.email);
  const rawPosts = useSelector((state) => state.posts.items);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const myPosts = [...rawPosts]
    .filter((post) => post.user?.email === currentUser)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const usedTags = AVAILABLE_TAGS.filter((tag) =>
    myPosts.some((p) => p.tags && p.tags.includes(tag)),
  );

  const filtered = myPosts.filter((post) => {
    const matchSearch =
      !search.trim() ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || (post.tags && post.tags.includes(activeTag));
    return matchSearch && matchTag;
  });

  const handleClick = () => navigate("/create-post");

  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This post will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${API_URL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            dispatch(removePost(postId));
            Swal.fire("Deleted!", "Your post has been deleted.", "success");
          } else {
            const data = await response.json();
            Swal.fire(
              "Error!",
              data.message || "Failed to delete post",
              "error",
            );
          }
        } catch (error) {
          Swal.fire("Network Error", "Could not reach the server.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-[92vh] bg-gray-100">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold">My Dashboard</h2>
          <button
            onClick={handleClick}
            className="bg-green-600 text-white px-5 py-2 rounded-lg text-sm sm:text-base hover:cursor-pointer hover:bg-green-700 hover:scale-95 duration-300 hover:border-blue-300 hover:shadow-lg transition font-semibold"
          >
            + Post Query
          </button>
        </div>
        <div className="relative mb-4">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search your questions..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
        {usedTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeTag === null
                  ? "bg-gray-700 text-white border-gray-800"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            {usedTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                  activeTag === tag ? TAG_ACTIVE[tag] : TAG_COLORS[tag]
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
        <div className="flex flex-col gap-5">
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <div
                key={post._id}
                className="bg--gray-100 p-4 sm:p-5 shadow-md rounded-xl border hover:border-blue-300 border-gray-200 hover:scale-[1.02] transition hover:shadow-xl duration-300 bg-white"
              >
                <h3 className="font-bold text-lg sm:text-xl mb-1">
                  {post.title}
                </h3>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${TAG_COLORS[tag] || "bg-gray-100 text-gray-600 border-gray-200"}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-gray-700 text-sm sm:text-base mb-4 line-clamp-2">
                  {post.content}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs sm:text-sm text-gray-500 mt-2 pt-4 border-t">
                  <div>
                    <span className="font-medium text-gray-800">By: You</span>
                    <span className="mx-2 hidden sm:inline">•</span>
                    <span className="block sm:inline">
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-red-600 transition duration-300 hover:scale-95 hover:cursor-pointer"
                    >
                      Delete
                    </button>
                    <Link
                      to={`/posts/${post._id}`}
                      className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition duration-300 hover:scale-95 hover:cursor-pointer"
                    >
                      View Answers
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-gray-500 bg-white rounded-xl border-2 border-dashed border-gray-300">
              {myPosts.length === 0 ? (
                <>
                  <p className="text-lg font-medium">No questions yet.</p>
                  <p className="text-sm mt-1">
                    Click <strong>+ Post Query</strong> to ask your first
                    question!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">No matching questions.</p>
                  <p className="text-sm mt-1">
                    Try a different search term or tag.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
