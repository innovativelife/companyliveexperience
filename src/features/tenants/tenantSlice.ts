import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface Tenant {
  tenantId: string,
  tenantName: string,
  customerName: string
}
export interface TenantState {
  loading: boolean;
  tenants: Array<Tenant>;
  error: string | undefined;
}
const initialState: TenantState = {
  loading: false,
  tenants: [],
  error: undefined,
}
const API_BASE_URL = import.meta.env.VITE_API_URL;

export const fetchTenants = createAsyncThunk(
  "tenants/fetchTenants",
  async () => {
    const response = await fetch(`${API_BASE_URL}/api/v1/Admin/Tenants`, {
      method: "GET", 
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        "tenantid": "Root", 
        "uid": "tester"
      }),
    });

    const data = await response.json();
    return data["tenants"];
  }
)
const tenantSlice = createSlice({
  name: 'tenants',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTenants.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTenants.fulfilled, (state, action: PayloadAction<Array<Tenant>>) => {
      state.loading = false;
      state.tenants = action.payload;
    });
    builder.addCase(fetchTenants.rejected, (state, action) => {
      state.loading = false;
      state.tenants = [];
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const tenantSelector = (state: RootState) => state.tenant;
export default tenantSlice.reducer;