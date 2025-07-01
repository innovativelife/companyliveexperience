import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIPreferencesState {
  isDarkMode: boolean;
}

const initialState: UIPreferencesState = {
  isDarkMode: false,
};

const uiPreferencesSlice = createSlice({
  name: "uiPreferences",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode(state, action: PayloadAction<boolean>) {
      state.isDarkMode = action.payload;
    },
  },
});

export const { toggleDarkMode, setDarkMode } = uiPreferencesSlice.actions;
export default uiPreferencesSlice.reducer;
