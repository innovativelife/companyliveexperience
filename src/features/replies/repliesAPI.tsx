// services/postsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Reply } from "./repliesType";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const userUID = import.meta.env.VITE_USER_UID;

export const repliesApi = createApi({
  reducerPath: "repliesApi",
  tagTypes: ["Reply"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/tenants/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("uid", userUID);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getReplies: builder.query<Reply[], {tenantId: string, postId: string} >({
      query: (query) => `${query.tenantId}/${query.postId}/replies`,
      transformResponse: (response: { replies: Reply[] }) => response.replies,
      providesTags: (result, _error, { postId }) =>
        result
          ? [
              ...result.map((reply) => ({
                type: "Reply" as const,
                id: reply.postId,
              })),
              { type: "Reply", id: "LIST" },
            ]
          : [{ type: "Reply", id: postId }],
    }),
    createReply: builder.mutation<void, { tenantId: string, message: string; postId: string }>({
      query: ({ tenantId, message, postId }) => ({
        url: `${tenantId}/${postId}/reply`,
        method: "POST",
        body: {
          message,
          employeeUID: userUID,
          status: "sent",
          sendTo: "all",
        },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Reply", id: postId },
        { type: "Reply", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetRepliesQuery, useCreateReplyMutation } = repliesApi;
