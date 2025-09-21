// services/postsApi.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import { Reaction } from "./reactionsType";
import { baseQueryWithReauth } from "../common/baseQuery";

import { ReactionType } from "./reactionsType";

const userUID = import.meta.env.VITE_USER_UID;

export const reactionApi = createApi({
  reducerPath: "reactionsApi",
  tagTypes: ["Reaction"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getReactions: builder.query<
      Reaction[],
      { tenantId: string; postId: string }
    >({
      query: (query) => `${query.tenantId}/${query.postId}/react`,
      transformResponse: (response: { reactions: Reaction[] }) =>
        response.reactions,
      providesTags: (result, _error, { postId }) =>
        result
          ? [
              ...result.map((reaction) => ({
                type: "Reaction" as const,
                id: reaction.postId,
              })),
              { type: "Reaction", id: "LIST" },
            ]
          : [{ type: "Reaction", id: postId }],
    }),
    createReaction: builder.mutation<
      void,
      { tenantId: string; reaction: ReactionType; postId: string }
    >({
      query: ({ tenantId, reaction, postId }) => ({
        url: `${tenantId}/${postId}/react`,
        method: "POST",
        body: {
          reaction,
          employeeUID: userUID,
        },
      }),
      invalidatesTags: (_result, _error, { postId }) => [
        { type: "Reaction", id: postId },
        { type: "Reaction", id: "LIST" },
      ],
    }),
  }),
});

export const { useGetReactionsQuery, useCreateReactionMutation } = reactionApi;
