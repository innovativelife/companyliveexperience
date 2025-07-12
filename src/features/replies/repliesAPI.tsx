// services/postsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { Reply } from "./repliesType";
import { baseQueryWithReauth } from "../common/baseQuery";

const userUID = import.meta.env.VITE_USER_UID;

export const repliesApi = createApi({
  reducerPath: "repliesApi",
  tagTypes: ["Reply"],
  baseQuery: baseQueryWithReauth,
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
