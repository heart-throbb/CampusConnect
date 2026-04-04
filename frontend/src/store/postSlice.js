import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { posts as dummyPosts, answersData } from "../data";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...dummyPosts]);
    }, 500);
  });
});

export const fetchAnswers = createAsyncThunk("posts/fetchAnswers", async (postId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = JSON.parse(localStorage.getItem(`answers-${postId}`));
      if (stored) {
        resolve({ postId, answers: stored });
      } else {
        const initialAnswers = (answersData[postId] || []).map((a) => ({
          ...a,
          votes: a.votes || 0,
          votesMap: a.votesMap || {},
        }));
        resolve({ postId, answers: initialAnswers });
      }
    }, 500);
  });
});

export const submitAnswer = createAsyncThunk(
  "posts/submitAnswer",
  async ({ postId, answer }, { getState }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const state = getState();
        const answersList = state.posts.answersByPost[postId] || [];
        const currentUserEmail = state.auth.user?.email || "guest";        
        let existingAnswer = answersList.find((a) => a.user?.email === currentUserEmail);
        let updated;       
        if (existingAnswer) {
          updated = answersList.map((ans) =>
            ans._id === existingAnswer._id ? { ...ans, content: answer } : ans
          );
        } else {
          const newAnsObj = {
            _id: Date.now().toString(),
            content: answer,
            user: { email: currentUserEmail },
            createdAt: new Date().toISOString(),
            votes: 0,
            votesMap: {},
          };
          updated = [newAnsObj, ...answersList];
        }       
        localStorage.setItem(`answers-${postId}`, JSON.stringify(updated));
        resolve({ postId, answers: updated });
      }, 500);
    });
  }
);

export const submitVote = createAsyncThunk(
  "posts/submitVote",
  async ({ postId, answerId, type }, { getState }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const state = getState();
        const answersList = state.posts.answersByPost[postId] || [];
        const currentUserEmail = state.auth.user?.email || "guest"; 
        const updated = answersList.map((ans) => {
          if (ans._id === answerId) {
            const prevVote = ans.votesMap[currentUserEmail];
            if (prevVote === type) {
              const newVotesMap = { ...ans.votesMap };
              delete newVotesMap[currentUserEmail];
              return {
                ...ans,
                votes: ans.votes + (type === "up" ? -1 : 1),
                votesMap: newVotesMap,
              };
            }
            let voteChange = 0;
            if (!prevVote) {
              voteChange = type === "up" ? 1 : -1;
            } else {
              voteChange = type === "up" ? 2 : -2;
            }
            return {
              ...ans,
              votes: ans.votes + voteChange,
              votesMap: {
                ...ans.votesMap,
                [currentUserEmail]: type,
              },
            };
          }
          return ans;
        });
        const sorted = updated.sort((a, b) => b.votes - a.votes);
        localStorage.setItem(`answers-${postId}`, JSON.stringify(sorted));
        resolve({ postId, answers: sorted });
      }, 200); 
    });
  }
);

export const deleteAnswer = createAsyncThunk(
  "posts/deleteAnswer",
  async ({ postId, answerId }, { getState }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const state = getState();
        const answersList = state.posts.answersByPost[postId] || [];
        const updated = answersList.filter(a => a._id !== answerId);
        localStorage.setItem(`answers-${postId}`, JSON.stringify(updated));
        resolve({ postId, answers: updated });
      }, 300);
    });
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(postId);
      }, 300);
    });
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
    status: "idle",
    answersByPost: {},
    answersStatus: {}, 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAnswers.pending, (state, action) => {
        state.answersStatus[action.meta.arg] = "loading";
      })
      .addCase(fetchAnswers.fulfilled, (state, action) => {
        state.answersStatus[action.payload.postId] = "succeeded";
        state.answersByPost[action.payload.postId] = action.payload.answers;
      })
      .addCase(submitAnswer.fulfilled, (state, action) => {
        state.answersByPost[action.payload.postId] = action.payload.answers;
      })
      .addCase(submitVote.fulfilled, (state, action) => {
        state.answersByPost[action.payload.postId] = action.payload.answers;
      })
      .addCase(deleteAnswer.fulfilled, (state, action) => {
        state.answersByPost[action.payload.postId] = action.payload.answers;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);
      });
  },
});

export default postSlice.reducer;
