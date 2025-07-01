import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UiConfig } from "./uiConfigTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const tenantId = import.meta.env.VITE_TENANT_ID;

export const uiConfigApi = createApi({
  reducerPath: "uiConfigApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${API_BASE_URL}/api/v1/tenants/` }),
  endpoints: (builder) => ({
    getUiConfigByTenant: builder.query<UiConfig, void>({
      query: () => `${tenantId}/UiConfig`,
    }),
  }),
});

export const { useGetUiConfigByTenantQuery } = uiConfigApi;
