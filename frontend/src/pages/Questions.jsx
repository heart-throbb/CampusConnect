import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AVAILABLE_TAGS } from "../data";

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

function Questions() {
  const posts = useSelector((state) => state.posts.items);
  const currentUser = useSelector((state) => state.auth.user?.email);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState(null);

  const filtered = posts.filter((post) => {
    const matchSearch =
      !search.trim() ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || (post.tags && post.tags.includes(activeTag));
    return matchSearch && matchTag;
  });

  return (
    <div className="bg-gray-100 min-h-[92vh]">
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          All Questions
        </h2>
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
            placeholder="Search questions by title or content..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl bg-gray-100 outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
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
          {AVAILABLE_TAGS.map((tag) => (
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
        <div className="flex flex-col gap-5">
          {filtered.length > 0 ? (
            filtered.map((post) => (
              <div
                key={post._id}
                className="bg-gray-100 p-5 shadow-md rounded-xl border border-gray-200 transition-all hover:border-blue-300 hover:scale-[1.02] duration-300 hover:shadow-xl"
              >
                <h3 className="font-bold text-xl mb-1 text-gray-900">
                  {post.title}
                </h3>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-3">
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

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.content}
                </p>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-gray-500 pt-3 border-t gap-4">
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="font-medium text-gray-700">
                      By:{" "}
                      {post.user?.email === currentUser ? "You" : "Anonymous"}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Link
                    to={`/posts/${post._id}`}
                    className="w-full sm:w-auto text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 hover:scale-95 transition-all shadow-md"
                  >
                    View Answers
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center bg-gray-100 py-20 text-gray-500 rounded-xl border-2 border-dashed border-gray-300">
              <p className="text-lg font-medium">No questions found.</p>
              <p className="text-sm mt-1">
                Try a different search term or tag.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Questions;
