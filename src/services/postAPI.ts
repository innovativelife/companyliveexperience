// services/postsApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Post } from '../features/posts/postSlice'; // use your existing type

const API_BASE_URL = import.meta.env.VITE_API_URL;
const tenantid = "tenant1"; // You can pass this dynamically later
const userUID = "tester";

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/tenants/`,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('tenantid', tenantid);
      headers.set('uid', userUID);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `${tenantid}/post`,
      transformResponse: (response: { posts: Post[] }) => response.posts,
    }),
    getPostById: builder.query<Post, string>({
      query: (postId) => `${tenantid}/post?postId=${postId}`,
      transformResponse: (response: { posts: Post[] }) => response.posts[0],
    }),
    createPost: builder.mutation<void, string>({
      query: (message) => ({
        url: `${tenantid}/post`,
        method: 'POST',
        body: {
          postId: "Id2",
          message: message,
          timeSent: "9:30",
          employeeUID: userUID,
          status: "sent",
          sendTo: "all",
        },
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
} = postsApi;