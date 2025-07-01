import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface TenantsState {
  selectedTenantId: string | null;
  showTenantEditor: boolean;
}

const initialState: TenantsState = {
  selectedTenantId: null,
  showTenantEditor: false,
};

const tenantsSlice = createSlice({
  name: "tenantsUI",
  initialState,
  reducers: {
    setSelectedTenant(state, action: PayloadAction<string>) {
      state.selectedTenantId = action.payload;
    },
    clearSelectedTenant(state) {
      state.selectedTenantId = null;
    },
    toggleTenantEditor(state) {
      state.showTenantEditor = !state.showTenantEditor;
    },
    setTenantEditorVisible(state, action: PayloadAction<boolean>) {
      state.showTenantEditor = action.payload;
    },
  },
});

export const {
  setSelectedTenant,
  clearSelectedTenant,
  toggleTenantEditor,
  setTenantEditorVisible,
} = tenantsSlice.actions;

export const tenantsUISelector = (state: RootState) => state.tenant;

export default tenantsSlice.reducer;
