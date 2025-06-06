import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Temporary Data -- Ask how to change
import temporaryData from "../../localData.json";
const tenantid = temporaryData.tenantid;

export interface UiConfig {
  googleFont: string,
  appBannerUrl: string,
  appTitle: string,
  homeTitle: string,
  peopleTitle: string,
  calendarTitle: string,
  tribesTitle: string,
  moreTitle: string,
  titleFontSize: string,
  headingFontSize: string,
  textFontSize: string,
  subTextFontSize: string,
  smallSpacing: string,
  mediumSpacing: string,
  largeSpacing: string,
  primaryColor: string,
  secondaryColor: string,
  tertiaryColor: string,
  backgroundColor: string,
  textColor: string,
  inputsColor: string
}

const anInitialState :UiConfig = {
  googleFont: "",
  appBannerUrl: "",
  appTitle: "",
  homeTitle: "",
  peopleTitle: "",
  calendarTitle: "",
  tribesTitle: "",
  moreTitle: "",
  titleFontSize: "",
  headingFontSize: "",
  textFontSize: "",
  subTextFontSize: "",
  smallSpacing: "",
  mediumSpacing: "",
  largeSpacing: "",
  primaryColor: "",
  secondaryColor: "",
  tertiaryColor: "",
  backgroundColor: "",
  textColor: "",
  inputsColor: ""
}

export interface UiConfigState {
  loading: boolean;
  uiConfigs: UiConfig;
  error: string | undefined;
}
const initialState: UiConfigState = {
  loading: false,
  uiConfigs: anInitialState,
  error: undefined,
}
export const fetchUiConfigs = createAsyncThunk(
  "uiConfig/fetchUiConfigs",
  async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/tenants/${tenantid}/UiConfig`, { 
      method: "GET", 
      mode: "cors",
      headers: new Headers({
        'Content-Type': 'application/json',
        "tenantid": "tenant1", 
        "uid": "tester"
      }),
    });

    const data = await response.json();
    return data["uiConfig"];
  }
)
const uiConfigSlice = createSlice({
  name: 'uiConfigs',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUiConfigs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUiConfigs.fulfilled, (state, action: PayloadAction<UiConfig>) => {
      state.loading = false;
      state.uiConfigs = action.payload;
    });
    builder.addCase(fetchUiConfigs.rejected, (state, action) => {
      state.loading = false;
      state.uiConfigs = anInitialState;
      state.error = action.error.message;
    });
  },
  reducers: {}
})
export const uiConfigSelector = (state: RootState) => state.ui;
export default uiConfigSlice.reducer;