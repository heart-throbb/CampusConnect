import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Frontend validation
    if (!title || !content) {
      Swal.fire({
        icon: "error",
        title: "Missing Information",
        text: "Please provide both a title and content for your post.",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    // Simulating post creation
    Swal.fire({
      icon: "success",
      title: "Post Created!",
      text: "Your question has been posted successfully.",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      // Redirect to the questions list or dashboard
      navigate("/questions"); 
    });
  };

  return (
    <div className="flex justify-center items-center grow px-4 lg:min-h-[92vh]">
      <div className="w-full max-w-2xl mx-auto bg-white p-8 shadow-2xl rounded-2xl border border-gray-100 transition-all">
        <h2 className="text-3xl font-extrabold mb-6 text-gray-800">Ask a Question</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
            <input
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g. How do I center a div?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <textarea
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Describe your problem in detail..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-all active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all transform active:scale-95"
            >
              Post Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;