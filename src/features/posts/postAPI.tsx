// services/postsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PostType } from "./postTypes";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

const API_BASE_URL = import.meta.env.VITE_API_URL;
// const useDynamicAuth = import.meta.env.VITE_USE_DYNAMIC_AUTH === "true";
//const state = getState() as RootState;
//------------------------------HOW can these be set dynamically
const tenantId = import.meta.env.VITE_TENANT_ID;
const userUID = import.meta.env.VITE_USER_UID;
const user = useSelector((state: RootState) => state.auth.user);

export const postsApi = createApi({
  
  reducerPath: "postsApi",
  tagTypes: ["Post"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/tenants/`,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      headers.set("Content-Type", "application/json");
      headers.set("tenantid", tenantId);
      headers.set("uid", userUID);

      console.log(`Auth Token: ${user?.getIdToken()}`)
      headers.set("Authorization", `Bearer ${state.auth.user?.getIdToken()}`);
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
      providesTags: (_, __, postId) => [{ type: "Post", id: postId }],
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
