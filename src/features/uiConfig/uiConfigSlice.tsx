import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UiConfig } from "./uiConfigTypes";

interface UiConfigState {
  uiConfigs: UiConfig | null;
}

const initialState: UiConfigState = {
  uiConfigs: null,
};

export const uiConfigSlice = createSlice({
  name: "uiConfig",
  initialState,
  reducers: {
    setUiConfig: (state, action: PayloadAction<UiConfig>) => {
      state.uiConfigs = action.payload;
    },
  },
});

export const { setUiConfig } = uiConfigSlice.actions;

export default uiConfigSlice.reducer;
