import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Temporary Data -- Ask how to change
import temporaryData from "../../localData.json";
const tenantid = temporaryData.tenantid;

export interface Employee {
  employeeNumber: string;
  firstName: string;
  lastName: string;
  PreferredName: string;
  email: string;
  phoneNumber: string;
  positionTitle: string;
  personalDescription: string;
  avatarURL: string;
}

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
      `http://127.0.0.1:8080/api/v1/tenants/${tenantid}/Employees`,
      {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          tenantid: tenantid,
          uid: "tester",
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
      `http://127.0.0.1:8080/api/v1/tenants/${tenantid}/Employees/${employeeUID}`,
      {
        method: "GET",
        mode: "cors",
        headers: new Headers({
          "Content-Type": "application/json",
          tenantid: tenantid,
          uid: "tester",
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
