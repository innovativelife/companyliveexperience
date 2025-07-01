// services/postsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostType } from "./postTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;
// const useDynamicAuth = import.meta.env.VITE_USE_DYNAMIC_AUTH === "true";
//const state = getState() as RootState;
//------------------------------HOW can these be set dynamically
const tenantId = import.meta.env.VITE_TENANT_ID;
const userUID = import.meta.env.VITE_USER_UID;

export const postsApi = createApi({
  reducerPath: "postsApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/tenants/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("tenantid", tenantId);
      headers.set("uid", userUID);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostType[], void>({
      query: () => `${tenantId}/post`,
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
    getPostById: builder.query<PostType, string>({
      query: (postId) => `${tenantId}/post?postId=${postId}`,
      transformResponse: (response: { posts: PostType[] }) => response.posts[0],
      providesTags: (result, error, postId) => [{ type: "Post", id: postId }],
    }),
    createPost: builder.mutation<void, string>({
      query: (message) => ({
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

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } =
  postsApi;
