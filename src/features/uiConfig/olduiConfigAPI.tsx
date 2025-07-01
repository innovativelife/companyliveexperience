import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UiConfig } from "./uiConfigTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const tenantId = import.meta.env.VITE_TENANT_ID;
const userUID = import.meta.env.VITE_USER_UID;

export const uiConfigApi = createApi({
  reducerPath: "uiConfigApi",
  tagTypes: ["UiConfig"],
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
    getUiConfigByTenant: builder.query<UiConfig, void>({
      query: () => `${tenantId}/UiConfig`,
      transformResponse: (response: { uiConfig: UiConfig }) =>
        response.uiConfig,
      providesTags: () => [{ type: "UiConfig", id: tenantId }],
    }),
    createUiConfig: builder.mutation<void, UiConfig>({
      query: (uiConfigData) => ({
        url: `${tenantId}/UiConfig`,
        method: "POST",
        body: uiConfigData,
      }),
      invalidatesTags: [{ type: "UiConfig", id: tenantId }],
    }),
  }),
});

export const { useGetUiConfigByTenantQuery, useCreateUiConfigMutation } =
  uiConfigApi;
