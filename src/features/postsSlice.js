import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get('https://dummyjson.com/docs/posts?limit=25');
  return response.data;
});

export const fetchPost = createAsyncThunk('posts/fetchPost', async (postId) => {
  const response = await axios.get(`https://dummyjson.com/docs/posts/${postId}`);
  return response.data;
});

export const addComment = createAsyncThunk('posts/addComment', async ({ postId, body }) => {
  const response = await axios.post(`https://dummyjson.com/docs/posts/${postId}/comments`, { body });
  return response.data;
});

export const deleteComment = createAsyncThunk('posts/deleteComment', async ({ postId, commentId }) => {
  await axios.delete(`https://dummyjson.com/docs/posts/${postId}/comments/${commentId}`);
  return commentId;
});

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload;
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
    [fetchPost.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.post = action.payload;
    },
    [fetchPost.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      state.post = null;
    },
    [addComment.fulfilled]: (state, action) => {
      state.post.comments.push(action.payload);
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.post.comments = state.post.comments.filter(comment => comment.id !== action.payload);
    },
  },
});

export default postsSlice.reducer;
