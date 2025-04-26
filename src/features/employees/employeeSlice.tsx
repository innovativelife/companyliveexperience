import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Employee {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  PreferredName: string;
  email: string;
  phoneNumber: string;
  positionTitle: string;
  personalDescription: string;
}

export interface EmployeeState {
  loading: boolean;
  employees: Array<Employee>;
  error: string | undefined;
}

const initialState: EmployeeState = {
  loading: false,
  employees: [],
  error: undefined,
};

export const fetchEmployees = createAsyncThunk(
  "employees/fethEmployees",
  async () => {
    const response = await fetch("http://127.0.0.1:8080/Employees/tenant1", {
      method: "GET",
      mode: "cors",
      headers: new Headers({
        "Content-Type": "application/json",
        tenantid: "tenant1",
        uid: "tester",
      }),
    });

    const data = await response.json();
    return data["employees"];
  }
);

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEmployees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchEmployees.fulfilled,
      (state, action: PayloadAction<Array<Employee>>) => {
        state.loading = false;
        state.employees = action.payload;
      }
    );
    builder.addCase(fetchEmployees.rejected, (state, action) => {
      state.loading = false;
      state.employees = [];
      state.error = action.error.message;
    });
  },
  reducers: {},
});
export const employeeSelector = (state: RootState) => state.employee;
export default employeeSlice.reducer;
