import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UiConfig } from "./uiConfigTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const uiConfigApi = createApi({
  reducerPath: "uiConfigApi",
  tagTypes: ["UiConfig"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/tenants/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUiConfigByTenant: builder.query<UiConfig, { tenantId: string }>({
      query: (queryParams) => `${queryParams.tenantId}/UiConfig`,
      transformResponse: (response: { uiConfig: UiConfig }) =>
        response.uiConfig,
      providesTags: (_, __, { tenantId }) => [{ type: "UiConfig", id: tenantId }],
    }),

    createUiConfig: builder.mutation<void, { tenantId: string, uiConfigData: UiConfig }>({
      query: ({ tenantId, uiConfigData }) => ({
        url: `${tenantId}/UiConfig`,
        method: "POST",
        body: uiConfigData,
      }),
      invalidatesTags: (_, __, { tenantId }) => [{ type: "UiConfig", id: tenantId }],
    }),
  }),
});

export const { useGetUiConfigByTenantQuery, useCreateUiConfigMutation } =
  uiConfigApi;
