// services/postsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { PostType } from "./postTypes";
import { baseQueryWithReauth } from "../common/baseQuery";

// const useDynamicAuth = import.meta.env.VITE_USE_DYNAMIC_AUTH === "true";

// ToDo: This should come from auth state instead of an environment variable.
const userUID = import.meta.env.VITE_USER_UID;

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Example query for protected data
    getPosts: builder.query<PostType[], { tenantId: string }>({
      query: (queryParams) => `${queryParams.tenantId}/post`,
      transformResponse: (response: { posts: PostType[] }) => response.posts,
      providesTags: (result) =>
        result
          ? [
            ...result.map((post) => ({
              type: "Post" as const,
              id: post.postId,
            })),
            { type: "Post", id: "LIST" },
          ]
          : [{ type: "Post", id: "LIST" }],
    }),
    getPostById: builder.query<PostType, {tenantId: string, postId: string}>({
      query: ({tenantId, postId}) => `${tenantId}/post?postId=${postId}`,
      transformResponse: (response: { posts: PostType[] }) => response.posts[0],
      providesTags: (_, __, { postId }) => [{ type: "Post", id: postId }],
    }),
    createPost: builder.mutation<void,  {tenantId: string, message: string}>({
      query: ({tenantId, message}) => ({
        url: `${tenantId}/post`,
        method: "POST",
        body: {
          message: message,
          employeeUID: userUID,
          status: "sent",
          sendTo: "all",
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postsApi;
