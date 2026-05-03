import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost, removePost } from "../store/postSlice";
import { API_URL } from "../config";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newAnswer, setNewAnswer] = useState("");
  const [isPrefilled, setIsPrefilled] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user?.email || "guest");
  const currentUserId = useSelector((state) => state.auth.user?._id || "guest");
  const post = useSelector((state) =>
    state.posts.items.find((p) => p._id === postId),
  );
  const answers = post?.answers || [];
  const sortedAnswers = [...answers].sort((a, b) => b.votes - a.votes);
  const topVotes = sortedAnswers.length > 0 ? sortedAnswers[0].votes : 0;
  const existingAnswer = answers.find(
    (a) => a.user?.email === currentUser || a.user?._id === currentUserId,
  );

  useEffect(() => {
    if (existingAnswer && !isPrefilled) {
      setNewAnswer(existingAnswer.content);
      setIsPrefilled(true);
    }
  }, [existingAnswer, isPrefilled]);

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    if (!token) {
      Swal.fire("Error", "You must be logged in to answer.", "error");
      return;
    }
    try {
      const response = await fetch(`${API_URL}/posts/${postId}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newAnswer }),
      });

      if (response.ok) {
        const postRes = await fetch(`${API_URL}/posts/${postId}`);
        const updatedPost = await postRes.json();
        dispatch(updatePost(updatedPost));

        Swal.fire({
          icon: "success",
          title: "Answer Submitted",
          timer: 800,
          showConfirmButton: false,
        });
        if (!existingAnswer) setNewAnswer("");
      } else {
        const data = await response.json();
        Swal.fire("Error", data.message || "Failed to submit answer", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Network Error. Could not connect to API.", "error");
    }
  };

  const handleVote = async (id, type) => {
    if (!token) {
      Swal.fire("Error", "You must be logged in to vote.", "error");
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/posts/${postId}/answers/${id}/vote`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ type }),
        },
      );

      if (response.ok) {
        const postRes = await fetch(`${API_URL}/posts/${postId}`);
        const updatedPost = await postRes.json();
        dispatch(updatePost(updatedPost));
      } else {
        const data = await response.json();
        Swal.fire("Error", data.message || "Failed to vote", "error");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAnswer = (answerId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `${API_URL}/posts/${postId}/answers/${answerId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (response.ok) {
            const postRes = await fetch(`${API_URL}/posts/${postId}`);
            const updatedPost = await postRes.json();
            dispatch(updatePost(updatedPost));

            setNewAnswer("");
            setIsPrefilled(false);
            Swal.fire({
              title: "Deleted!",
              text: "Your answer has been deleted.",
              icon: "success",
              timer: 800,
              showConfirmButton: false,
            });
          } else {
            const data = await response.json();
            Swal.fire(
              "Error",
              data.message || "Failed to delete answer",
              "error",
            );
          }
        } catch (err) {
          Swal.fire("Error", "Network Error", "error");
        }
      }
    });
  };

  const handleDeletePost = () => {
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
            Swal.fire({
              title: "Deleted!",
              text: "Your post has been deleted.",
              icon: "success",
              timer: 800,
              showConfirmButton: false,
            });
            navigate("/dashboard");
          } else {
            const data = await response.json();
            Swal.fire(
              "Error",
              data.message || "Failed to delete post",
              "error",
            );
          }
        } catch (err) {
          Swal.fire("Error", "Network Error", "error");
        }
      }
    });
  };

  if (!post) {
    return (
      <div className="flex items-center justify-center h-[90vh]">
        <div className="text-xl font-bold text-gray-500">
          Post not found. Trying to load or it was deleted...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[92vh] bg-gray-100">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="bg-gray-100 p-4 sm:p-6 shadow rounded-xl border border-gray-200 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold">{post.title}</h2>
            {post.user?.email === currentUser && (
              <button
                onClick={handleDeletePost}
                className="text-red-500 font-semibold text-sm hover:underline ml-4 bg-red-100 hover:bg-red-200 hover:cursor-pointer hover:scale-90 px-3 py-1 rounded transition duration-300 whitespace-nowrap"
              >
                Delete Post
              </button>
            )}
          </div>
          <p className="text-base sm:text-lg text-gray-800 mb-6">
            {post.content}
          </p>
          <div className="text-xs sm:text-sm text-gray-500 flex flex-col sm:flex-row sm:justify-between border-t pt-4">
            <span>
              Asked by{" "}
              <span className="font-medium">
                {post.user?.email === currentUser
                  ? "You"
                  : "Anonymous User"}
              </span>
            </span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            Answers ({sortedAnswers.length})
          </h3>
          {sortedAnswers.length === 0 ? (
            <p className="text-gray-500 italic">
              No answers yet. Be the first!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {sortedAnswers.map((answer) => {
                const isBest = answer.votes === topVotes && topVotes > 0;
                const userVote = answer.votesMap?.[currentUserId]; // Backend map uses User ID
                const isMyAnswer =
                  answer.user?._id === currentUserId ||
                  answer.user?.email === currentUser;

                return (
                  <div
                    key={answer._id}
                    className={`p-4 rounded-xl border hover:scale-[1.02] hover:border-blue-300 transition duration-300 shadow-sm ${
                      isBest
                        ? "bg-green-50 border-green-400"
                        : "bg-gray-100 border-gray-200"
                    }`}
                  >
                    {(isBest || isMyAnswer) && (
                      <div className="flex justify-between items-start mb-2 gap-4">
                        {isBest ? (
                          <div className="text-green-700 font-bold">
                            🏆 Best Answer
                          </div>
                        ) : (
                          <div />
                        )}
                        {isMyAnswer && (
                          <button
                            onClick={() => handleDeleteAnswer(answer._id)}
                            className="text-red-500 text-xs font-semibold bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition duration-300 cursor-pointer hover:scale-95 whitespace-nowrap ml-auto"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                    <p className="text-gray-800 mb-3">{answer.content}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-gray-500 border-t pt-2 mt-2">
                      <span>
                        {isMyAnswer
                          ? "You"
                          : "Anonymous User"}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleVote(answer._id, "up")}
                          className={`hover:scale-110 transition cursor-pointer ${
                            userVote === "up"
                              ? "text-green-600 scale-[1.15]"
                              : ""
                          }`}
                        >
                          <ThumbsUp className="size-4" strokeWidth={2} />
                        </button>
                        <span className="font-bold text-sm text-gray-700">
                          {answer.votes}
                        </span>
                        <button
                          onClick={() => handleVote(answer._id, "down")}
                          className={`hover:scale-110 transition cursor-pointer ${
                            userVote === "down"
                              ? "text-red-600 scale-[1.15]"
                              : ""
                          }`}
                        >
                          <ThumbsDown className="size-4" strokeWidth={2} />
                        </button>
                      </div>
                      <span>{new Date(answer.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {token ? (
          <div className="bg-gray-100 p-4 sm:p-6 shadow rounded-xl border border-gray-200">
            <h3 className="text-lg sm:text-xl font-bold mb-4">Your Answer</h3>
            <form onSubmit={handleAnswerSubmit}>
              <textarea
                className="w-full border p-3 rounded-lg mb-4 min-h-[120px] outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your answer..."
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <button
                className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 hover:cursor-pointer transition hover:scale-[0.98] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                disabled={!newAnswer.trim()}
              >
                Submit Answer
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-gray-200 p-4 rounded-xl text-center border">
            <p className="text-gray-600">
              Please{" "}
              <a href="/login" className="text-blue-600 underline">
                Login
              </a>{" "}
              to answer this question.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetails;
