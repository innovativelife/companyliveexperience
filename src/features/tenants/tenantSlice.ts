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
export const fetchTenants = createAsyncThunk(
  "tenants/fetchTenants",
  () => {
    const res = fetch('http://127.0.0.1:8080/Tenants',
        {
            method: "GET", 
            mode: "cors",
            headers: new Headers({
                'Content-Type': 'application/json',
                "tenantid": "Root", 
                "uid": "tester"
              }),
      }).then(data => data.json());
    return res;
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
export const tenantSelector = (state: RootState) => state.tenantReducer;
export default tenantSlice.reducer;