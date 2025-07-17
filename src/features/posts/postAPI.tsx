// services/postsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { PostType } from "./postTypes";
import { baseQueryWithReauth } from "../common/baseQuery";

// Get user ID from dtate

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post'],
  endpoints: (builder) => ({
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
    getPostById: builder.query<PostType, { tenantId: string, postId: string }>({
      query: ({ tenantId, postId }) => `${tenantId}/post?postId=${postId}`,
      transformResponse: (response: { posts: PostType[] }) => response.posts[0],
      providesTags: (_, __, { postId }) => [{ type: "Post", id: postId }],
    }),
    createPost: builder.mutation<void, { tenantId: string, userUid: string, message: string }>({
      query: ({ tenantId, userUid, message }) => ({
        url: `${tenantId}/post`,
        method: "POST",
        body: {
          message: message,
          employeeUID: userUid,
          status: "sent",
          sendTo: "all",
        },
      }),
      invalidatesTags: [{ type: "Post", id: "LIST" }],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postsApi;
