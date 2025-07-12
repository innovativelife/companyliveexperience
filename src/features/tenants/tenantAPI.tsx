import { createApi } from "@reduxjs/toolkit/query/react";
import { Tenant, CreateTenantPayload } from "./tenantTypes";
import { baseQueryWithReauth } from "../common/baseQuery";

export const tenantApi = createApi({
  reducerPath: "tenantApi",
  tagTypes: ["Tenant"],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getTenants: builder.query<Tenant[], void>({
      query: () => `tenants/`,
      transformResponse: (response: { tenants: Tenant[] }) => response.tenants,
      providesTags: (result) =>
        result
          ? [
              ...result.map((tenant) => ({
                type: "Tenant" as const,
                id: tenant.tenantId,
              })),
              { type: "Tenant", id: "LIST" },
            ]
          : [{ type: "Tenant", id: "LIST" }],
    }),
    getTenantById: builder.query<Tenant, string>({
      query: (tenantRequested) => `tenants/${tenantRequested}`,
      transformResponse: (response: { tenant: Tenant }) => response.tenant,
      providesTags: (_, __, tenantId) => [
        //result, error
        { type: "Tenant", id: tenantId },
      ],
    }),
    createTenant: builder.mutation<void, CreateTenantPayload>({
      query: (tenantData) => ({
        url: `Admin/tenants`,
        method: "POST",
        body: tenantData,
      }),
      invalidatesTags: [{ type: "Tenant", id: "LIST" }],
    }),
  }),
});

export const {
  useGetTenantsQuery,
  useGetTenantByIdQuery,
  useCreateTenantMutation,
} = tenantApi;
