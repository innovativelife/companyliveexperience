// services/postsApi.ts
import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { PostType } from "./postTypes";
import { logout } from '../../features/auth/authSlice';
import { RootState } from "../../app/store";

const API_BASE_URL = import.meta.env.VITE_API_URL;
// const useDynamicAuth = import.meta.env.VITE_USE_DYNAMIC_AUTH === "true";

// ToDo: Need to fix this - get tenantId from the URL and store in state
const tenantId = import.meta.env.VITE_TENANT_ID;

// ToDo: This should come from auth state instead of an environment variable.
const userUID = import.meta.env.VITE_USER_UID;

const baseQuery = fetchBaseQuery({
  
    baseUrl: `${API_BASE_URL}/api/v1/tenants/`,
    prepareHeaders: (headers, { getState }) => {

      const state = getState() as RootState;
      const token = state.auth.token;
      if (token)
      {
        headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set("Content-Type", "application/json");

      // Todo - Delete - not needed
      // headers.set("tenantid", tenantId);

      // ToDo - Set the user id in state from this environment variable
      if (import.meta.env.DEV)
      {
        headers.set("uid", import.meta.env.VITE_USER_UID);
      }

      return headers;
    },
  });

  const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && (result.error.status === 401 || result.error.status === 403)) {
    console.warn('Unauthorized or Forbidden: Logging out user.');
    api.dispatch(logout()); // Dispatch logout action
    // ToDo: Add a global redirect here if not handled by a PrivateRoute
    // For example: window.location.href = '/login';
  }
  return result;
};

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    // Example query for protected data
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

// export const { useGetProtectedDataQuery, usePostSomeProtectedActionMutation } = yourApi;



//   endpoints: (builder) => ({
//     getPosts: builder.query<PostType[], void>({
//       query: () => `${tenantId}/post`,
//       transformResponse: (response: { posts: PostType[] }) => response.posts,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map((post) => ({
//                 type: "Post" as const,
//                 id: post.postId,
//               })),
//               { type: "Post", id: "LIST" },
//             ]
//           : [{ type: "Post", id: "LIST" }],
//     }),
//     getPostById: builder.query<PostType, string>({
//       query: (postId) => `${tenantId}/post?postId=${postId}`,
//       transformResponse: (response: { posts: PostType[] }) => response.posts[0],
//       providesTags: (_, __, postId) => [{ type: "Post", id: postId }],
//     }),
//     createPost: builder.mutation<void, string>({
//       query: (message) => ({
//         url: `${tenantId}/post`,
//         method: "POST",
//         body: {
//           message: message,
//           employeeUID: userUID,
//           status: "sent",
//           sendTo: "all",
//         },
//       }),
//       invalidatesTags: [{ type: "Post", id: "LIST" }],
//     }),
//   }),
// });

export const { useGetPostsQuery, useGetPostByIdQuery, useCreatePostMutation } = postsApi;
