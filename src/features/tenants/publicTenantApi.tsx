import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TenantIdentityProviderId } from "./tenantTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const baseUrl = `${API_BASE_URL}/api/v1/`;

export const publicTenantApi = createApi({
  reducerPath: "publicTenantApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["PublicTenant"],
  endpoints: (builder) => ({
    getTenantById: builder.query<TenantIdentityProviderId, string>({
      query: (tenantId) => `admin/tenants/${tenantId}/getidentitymanagertenantId`,
      providesTags: (_, __, tenantId) => [{ type: "PublicTenant", id: tenantId }],
    }),
  }),
});

export const { useGetTenantByIdQuery } =
  publicTenantApi;