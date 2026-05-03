import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "posts",
  initialState: {
    items: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.items = action.payload;
    },
    updatePost: (state, action) => {
      const index = state.items.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.items[index] = action.payload; 
      } else {
        state.items.unshift(action.payload); 
      }
    },
    removePost: (state, action) => {
      state.items = state.items.filter((p) => p._id !== action.payload);
    },
  },
});

export const { setPosts, updatePost, removePost } = postSlice.actions;
export default postSlice.reducer;
