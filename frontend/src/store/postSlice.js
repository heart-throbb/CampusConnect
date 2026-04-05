import { createSlice } from "@reduxjs/toolkit";
import { posts as dummyPosts, answersData } from "../data";

const initialAnswersByPost = {};
Object.keys(answersData).forEach((postId) => {
  initialAnswersByPost[postId] = answersData[postId].map((a) => ({
    ...a,
    votes: a.votes || 0,
    votesMap: a.votesMap || {},
  }));
});

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [...dummyPosts],
    answersByPost: initialAnswersByPost,
  },
  reducers: {
    createPost: (state, action) => {
      const { title, content, currentUserEmail, tags } = action.payload;
      const newPost = {
        _id: Date.now().toString(),
        title,
        content,
        tags: tags || [],
        user: { email: currentUserEmail || "you" },
        createdAt: new Date().toISOString(),
      };
      state.items.unshift(newPost);
    },
    deletePost: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
      delete state.answersByPost[action.payload];
    },
    submitAnswer: (state, action) => {
      const { postId, answer, currentUserEmail } = action.payload;
      if (!state.answersByPost[postId]) {
        state.answersByPost[postId] = [];
      }
      const answersList = state.answersByPost[postId];
      const email = currentUserEmail || "guest";
      const existingAnswer = answersList.find((a) => a.user?.email === email);

      if (existingAnswer) {
        existingAnswer.content = answer;
      } else {
        const newAnsObj = {
          _id: Date.now().toString(),
          content: answer,
          user: { email: email },
          createdAt: new Date().toISOString(),
          votes: 0,
          votesMap: {},
        };
        state.answersByPost[postId].unshift(newAnsObj);
      }
    },
    submitVote: (state, action) => {
      const { postId, answerId, type, currentUserEmail } = action.payload;
      const answersList = state.answersByPost[postId] || [];
      const email = currentUserEmail || "guest";
      const answer = answersList.find((ans) => ans._id === answerId);

      if (answer) {
        const prevVote = answer.votesMap[email];
        if (prevVote === type) {
          delete answer.votesMap[email];
          answer.votes += type === "up" ? -1 : 1;
        } else {
          let voteChange = 0;
          if (!prevVote) {
            voteChange = type === "up" ? 1 : -1;
          } else {
            voteChange = type === "up" ? 2 : -2;
          }
          answer.votes += voteChange;
          answer.votesMap[email] = type;
        }

        state.answersByPost[postId] = answersList.sort(
          (a, b) => b.votes - a.votes,
        );
      }
    },
    deleteAnswer: (state, action) => {
      const { postId, answerId } = action.payload;
      if (state.answersByPost[postId]) {
        state.answersByPost[postId] = state.answersByPost[postId].filter(
          (a) => a._id !== answerId,
        );
      }
    },
  },
});

export const {
  createPost,
  deletePost,
  submitAnswer,
  submitVote,
  deleteAnswer,
} = postSlice.actions;
export default postSlice.reducer;
