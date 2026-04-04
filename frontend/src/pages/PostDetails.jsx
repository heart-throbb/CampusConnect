import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPosts,
  fetchAnswers,
  submitAnswer,
  submitVote,
  deleteAnswer,
  deletePost,
} from "../store/postSlice";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newAnswer, setNewAnswer] = useState("");
  const [isPrefilled, setIsPrefilled] = useState(false);
  const currentUser = useSelector((state) => state.auth.user?.email || "guest");
  const postsStatus = useSelector((state) => state.posts.status);
  const topVotes = answers.length > 0 ? answers[0].votes : 0;
  const post = useSelector((state) =>
    state.posts.items.find((p) => p._id === postId),
  );
  const answersStatus = useSelector(
    (state) => state.posts.answersStatus[postId],
  );
  const answers = useSelector(
    (state) => state.posts.answersByPost[postId] || [],
  );
  const existingAnswer = answers.find((a) => a.user?.email === currentUser);
  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);
  useEffect(() => {
    if (!answersStatus || answersStatus === "idle") {
      dispatch(fetchAnswers(postId));
    }
  }, [answersStatus, dispatch, postId]);
  useEffect(() => {
    if (existingAnswer && !isPrefilled) {
      setNewAnswer(existingAnswer.content);
      setIsPrefilled(true);
    }
  }, [existingAnswer, isPrefilled]);
  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;
    dispatch(submitAnswer({ postId, answer: newAnswer })).then(() => {
      Swal.fire({
        icon: "success",
        title: existingAnswer ? "Answer Updated" : "Answer Submitted",
        timer: 800,
        showConfirmButton: false,
      });
      if (!existingAnswer) setNewAnswer("");
    });
  };

  const handleVote = (id, type) => {
    dispatch(submitVote({ postId, answerId: id, type }));
  };

  const handleDeleteAnswer = (answerId) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAnswer({ postId, answerId }));
        setNewAnswer("");
        setIsPrefilled(false);
        Swal.fire({
          title: "Deleted!",
          text: "Your answer has been deleted.",
          icon: "success",
          timer: 800,
          showConfirmButton: false,
        });
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
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deletePost(postId)).then(() => {
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success",
            timer: 800,
            showConfirmButton: false,
          });
          navigate("/dashboard");
        });
      }
    });
  };

  if (!post || postsStatus === "loading" || answersStatus === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[92vh] bg-gray-100">
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="bg-gray-100 p-4 sm:p-6 shadow rounded border border-gray-200 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl sm:text-3xl font-bold">{post.title}</h2>
            {post.user?.email === currentUser && (
              <button
                onClick={handleDeletePost}
                className="text-red-500 text-sm hover:underline ml-4 bg-red-100 hover:bg-red-200 hover:cursor-pointer hover:scale-90 px-3 py-1 rounded transition duration-300 whitespace-nowrap"
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
                {post.user?.email === currentUser ? "You" : "Anonymous User"}
              </span>
            </span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-4">
            Answers ({answers.length})
          </h3>
          {answers.length === 0 ? (
            <p className="text-gray-500 italic">
              No answers yet. Be the first!
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              {answers.map((answer) => {
                const isBest = answer.votes === topVotes && topVotes > 0;
                const userVote = answer.votesMap?.[currentUser];
                return (
                  <div
                    key={answer._id}
                    className={`p-4 rounded border hover:scale-110 transition duration-300 shadow-sm ${
                      isBest
                        ? "bg-green-50 border-green-400"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    {(isBest || answer.user?.email === currentUser) && (
                      <div className="flex justify-between items-start mb-2 gap-4">
                        {isBest ? (
                          <div className="text-green-700 font-bold">
                            🏆 Best Answer
                          </div>
                        ) : (
                          <div />
                        )}
                        {answer.user?.email === currentUser && (
                          <button
                            onClick={() => handleDeleteAnswer(answer._id)}
                            className="text-red-500 text-xs bg-red-100 hover:bg-red-200 px-3 py-1 rounded transition duration-300 cursor-pointer hover:scale-95 whitespace-nowrap ml-auto"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                    <p className="text-gray-800 mb-3">{answer.content}</p>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-xs text-gray-500 border-t pt-2 mt-2">
                      <span>
                        {answer.user?.email === currentUser
                          ? "You"
                          : "Anonymous User"}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleVote(answer._id, "up")}
                          className={`hover:scale-130 transition ${
                            userVote === "up" ? "text-green-600 scale-125" : ""
                          }`}
                        >
                          <ThumbsUp className="size-4" strokeWidth={2} />
                        </button>
                        <span className="font-bold text-sm text-gray-700">
                          {answer.votes}
                        </span>
                        <button
                          onClick={() => handleVote(answer._id, "down")}
                          className={`hover:scale-130 transition ${
                            userVote === "down" ? "text-red-600 scale-125" : ""
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
        <div className="bg-gray-100 p-4 sm:p-6 shadow rounded border border-gray-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">
            {existingAnswer ? "Edit Your Answer" : "Your Answer"}
          </h3>
          <form onSubmit={handleAnswerSubmit}>
            <textarea
              className="w-full border p-3 rounded mb-4 min-h-[120px]"
              placeholder={
                existingAnswer
                  ? "Update your answer..."
                  : "Write your answer..."
              }
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer transition hover:scale-105"
              disabled={
                !newAnswer.trim() ||
                (existingAnswer && newAnswer === existingAnswer.content)
              }
            >
              {existingAnswer ? "Update Answer" : "Submit Answer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
