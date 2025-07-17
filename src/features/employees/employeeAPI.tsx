import { createApi } from "@reduxjs/toolkit/query/react";
import { Employee, CreateEmployeePayload } from "./employeeTypes";
import { baseQueryWithReauth } from "../common/baseQuery";

export const employeesApi = createApi({
  reducerPath: "employeesApi",
  tagTypes: ["Employee"],
  baseQuery: baseQueryWithReauth,
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
