import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface EmployeesState {
  selectedEmployeeId: string | null;
  showEmployeeEditor: boolean;
}

const initialState: EmployeesState = {
  selectedEmployeeId: null,
  showEmployeeEditor: false,
};

const employeesSlice = createSlice({
  name: "employeesUI",
  initialState,
  reducers: {
    setSelectedEmployee(state, action: PayloadAction<string>) {
      state.selectedEmployeeId = action.payload;
    },
    clearSelectedEmployee(state) {
      state.selectedEmployeeId = null;
    },
    toggleEmployeeEditor(state) {
      state.showEmployeeEditor = !state.showEmployeeEditor;
    },
    setEmployeeEditorVisible(state, action: PayloadAction<boolean>) {
      state.showEmployeeEditor = action.payload;
    },
  },
});

export const {
  setSelectedEmployee,
  clearSelectedEmployee,
  toggleEmployeeEditor,
  setEmployeeEditorVisible,
} = employeesSlice.actions;

export const employeesUISelector = (state: RootState) => state.employee;

export default employeesSlice.reducer;
