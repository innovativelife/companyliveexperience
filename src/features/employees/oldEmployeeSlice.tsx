import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Employee } from "./employeeTypes";

//Temporary Data -- Ask how to change
const tenantId = import.meta.env.VITE_TENANT_ID;
const API_BASE_URL = import.meta.env.VITE_API_URL;
const uId = import.meta.env.VITE_USER_UID;

const anInitialState: Employee = {
  employeeNumber: "",
  firstName: "",
  lastName: "",
  PreferredName: "",
  email: "",
  phoneNumber: "",
  positionTitle: "",
  personalDescription: "",
  avatarURL: "",
  employeeUID: "",
};

export interface EmployeeState {
  loading: boolean;
  employees: Array<Employee>;
  singleEmployee: Employee;
  error: string | undefined;
}

const initialState: EmployeeState = {
  loading: false,
  employees: [],
  singleEmployee: anInitialState,
  error: undefined,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fetchEmployees",
  async () => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/tenants/${tenantId}/Employees`,
      {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          tenantid: tenantId,
          uid: uId,
        }),
      }
    );

    const data = await response.json();
    return data["employees"];
  }
);

export const fetchEmployee = createAsyncThunk(
  "employees/fetchEmployee",
  async (employeeUID: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/v1/tenants/${tenantId}/Employees/${employeeUID}`,
      {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          tenantid: tenantId,
          uid: uId,
        }),
      }
    );
    const data = await response.json();
    return data["employee"];
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployees.fulfilled, (state, action) => {
      state.employees = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchEmployee.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEmployee.fulfilled, (state, action) => {
      state.singleEmployee = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchEmployee.rejected, (state, action) => {
      state.loading = false;
      state.singleEmployee = anInitialState;
      state.error = action.error.message;
    });
  },
  reducers: {},
});
export const employeeSelector = (state: RootState) => state.employee;
export default employeeSlice.reducer;
