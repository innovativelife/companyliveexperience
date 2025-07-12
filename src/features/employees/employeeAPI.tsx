import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Employee, CreateEmployeePayload } from "./employeeTypes";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const userUID = import.meta.env.VITE_USER_UID;

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  tagTypes: ["Employee"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/api/v1/tenants/`,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("uid", userUID);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getEmployees: builder.query<Employee[], { tenantId: string }>({
      query: (queryParams) => 
        `${queryParams.tenantId}/Employees`,
      transformResponse: (response: { employees: Employee[] }) =>
        response.employees,
      providesTags: (result) =>
        result
          ? [
              ...result.map((employee) => ({
                type: "Employee" as const,
                id: employee.employeeUID,
              })),
              { type: "Employee", id: "LIST" },
            ]
          : [{ type: "Employee", id: "LIST" }],
    }),
    getEmployeeById: builder.query<Employee, { tenantId: string, employeeUID: string }>({
      query: (queryParams) => 
        {

          return `${queryParams.tenantId}/Employees/${queryParams.employeeUID}`
        },
      transformResponse: (response: { employee: Employee }) =>
        response.employee,
      providesTags: (_, __, { employeeUID }) => [
        { type: "Employee", id: employeeUID },
      ],
    }),
    createEmployee: builder.mutation<void, { tenantId: string, employeeData: CreateEmployeePayload}>({
      query: (data) => ({
        url: `${data.tenantId}/Employees`,
        method: "POST",
        body: data.employeeData,
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
  }),
});

export const {
  useGetEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
} = employeesApi;
