import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Dashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const dummyPosts = [
      {
        _id: "1",
        title: "How to prepare for DSA?",
        content: "I am struggling with DSA. Any tips?",
        user: { email: "baka@baka.com" },
        createdAt: new Date().toISOString(),
      },
      {
        _id: "2",
        title: "Best resources for React?",
        content: "Can someone suggest good React learning resources?",
        user: { email: "baka@uni.com" },
        createdAt: new Date(Date.now() - 10000000).toISOString(),
      },
      {
        _id: "3",
        title: "Best resources for JS?",
        content: "Can someone suggest good JS learning resources?",
        user: { email: "baka@uni.com" },
        createdAt: new Date(Date.now() - 20000000).toISOString(),
      },
      {
        _id: "4",
        title: "Best resources for AI?",
        content: "Can someone suggest good AI learning resources?",
        user: { email: "baka@baka.com" },
        createdAt: new Date(Date.now() - 40000000).toISOString(),
      },
      {
        _id: "5",
        title: "Best resources for AI?",
        content: "Can someone suggest good AI learning resources?",
        user: { email: "baka@baka.com" },
        createdAt: new Date(Date.now() - 40000000).toISOString(),
      },
    ];
    setPosts(
      dummyPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    );
  }, []);
  const handleClick = () => {
    Swal.fire({
      icon: "info",
      title: "Feature Coming Soon 🚀",
      text: "Backend not connected yet",
      confirmButtonColor: "#2563eb",
    });
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Dashboard</h2>
      <button
        onClick={handleClick}
        className="bg-green-600 text-white px-4 py-2 rounded text-sm sm:text-base hover:cursor-pointer hover:bg-green-700 hover:scale-105 hover:shadow-lg transition"
      >
        Post Query
      </button>
      <div className="flex flex-col gap-5 mt-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white p-4 sm:p-5 shadow rounded border border-gray-200 hover:scale-110 transition hover:shadow-xl duration-300"
          >
            <h3 className="font-bold text-lg sm:text-xl mb-2">{post.title}</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              {post.content}
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs sm:text-sm text-gray-500 mt-4 pt-4 border-t">
              <div>
                <span className="font-medium text-gray-800">
                  By: {post.user?.email}
                </span>
                <span className="mx-2 hidden sm:inline">•</span>
                <span className="block sm:inline">
                  {new Date(post.createdAt).toLocaleString()}
                </span>
              </div>
              <button
                onClick={handleClick}
                className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded text-xs sm:text-sm hover:bg-blue-700 transition hover:scale-90 hover:cursor-pointer"
              >
                View Answers
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
