import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../store/postSlice";
import { AVAILABLE_TAGS } from "../data";
import { API_URL } from "../config";

const TAG_COLORS = {
  DSA: "bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200",
  JavaScript:
    "bg-yellow-100 text-yellow-700 border-yellow-300 hover:bg-yellow-200",
  TypeScript:
    "bg-blue-100   text-blue-700   border-blue-300   hover:bg-blue-200",
  React: "bg-cyan-100   text-cyan-700   border-cyan-300   hover:bg-cyan-200",
  Python: "bg-green-100  text-green-700  border-green-300  hover:bg-green-200",
  "C++": "bg-red-100    text-red-700    border-red-300    hover:bg-red-200",
  Java: "bg-orange-100 text-orange-700 border-orange-300 hover:bg-orange-200",
  "AI / ML":
    "bg-pink-100   text-pink-700   border-pink-300   hover:bg-pink-200",
  "Web Dev":
    "bg-indigo-100 text-indigo-700 border-indigo-300 hover:bg-indigo-200",
  Database: "bg-teal-100   text-teal-700   border-teal-300   hover:bg-teal-200",
  Career: "bg-lime-100   text-lime-700   border-lime-300   hover:bg-lime-200",
  Other: "bg-gray-200   text-gray-700   border-gray-300   hover:bg-gray-300",
};

const TAG_SELECTED = {
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

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // token to check if usr is authorized to do
  const token = useSelector((state) => state.auth.token);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please provide both a title and content for your post.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags: selectedTags }),
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(updatePost(data));
        Swal.fire({
          icon: "success",
          title: "Post Created!",
          text: "Your question has been posted successfully.",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate("/questions");
        });
      } else {
        Swal.fire("Error", data.message || "Could not create post", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Network Error", "Could not reach the server.", "error");
    }
  };

  return (
    <div className="min-h-[92vh] bg-gray-100">
      <div className="flex justify-center items-center grow px-4 py-8 lg:min-h-[92vh]">
        <div className="w-full max-w-2xl mx-auto bg-gray-100 p-8 shadow-2xl rounded-2xl border border-gray-200 transition-all">
          <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
            Ask a Question
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title
              </label>
              <input
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                placeholder="e.g. How do I center a div?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content
              </label>
              <textarea
                rows="5"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none bg-white"
                placeholder="Describe your problem in detail..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Tags{" "}
                <span className="font-normal text-gray-400">
                  (pick all that apply)
                </span>
              </label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                        isSelected ? TAG_SELECTED[tag] : TAG_COLORS[tag]
                      }`}
                    >
                      {isSelected && <span className="mr-1">✓</span>}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-200 transition-all hover:scale-[0.98] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all transform hover:scale-[0.98] cursor-pointer"
              >
                Post Question
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
