import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Questions() {
  // Mock data to replace the backend response
  const [posts, setPosts] = useState([
    {
      _id: "1",
      title: "How do I use Tailwind CSS with React?",
      content: "I'm trying to figure out the best way to set up Tailwind in a Vite project. Any tips?",
      user: { email: "user@example.com" },
      createdAt: new Date().toISOString(),
    },
    {
      _id: "2",
      title: "What is the best state management library in 2026?",
      content: "Should I stick with Redux Toolkit or move to something like Zustand?",
      user: { email: "dev_guy@gmail.com" },
      createdAt: new Date().toISOString(),
    },
  ]);

  return (
    <div className="p-4 max-w-4xl mx-auto lg:min-h-[92vh]">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">All Questions</h2>

      <div className="flex flex-col gap-5">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-5 shadow-lg rounded-xl border border-gray-200 transition-all hover:border-blue-300"
            >
              <h3 className="font-bold text-xl mb-2 text-gray-900">{post.title}</h3>
              <p className="text-gray-700 mb-4 line-clamp-3">{post.content}</p>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 mt-4 pt-4 border-t gap-4">
                <div className="flex flex-wrap items-center">
                  <span className="font-medium text-gray-800">By: {post.user?.email}</span>
                  <span className="mx-2 hidden sm:inline">•</span>
                  <span className="block sm:inline">{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                
                <Link
                  to={`/posts/${post._id}`}
                  className="w-full sm:w-auto text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-95 transition-all shadow-md active:bg-blue-800"
                >
                  View Answers
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-gray-500 bg-gray-100 rounded-xl border-2 border-dashed border-gray-300">
            <p className="text-lg">No questions have been asked yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Questions;