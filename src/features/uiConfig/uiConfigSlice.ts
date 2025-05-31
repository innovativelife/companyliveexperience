import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

//Temporary Data -- Ask how to change
import temporaryData from "../../temporaryData.json";
const tenantid = temporaryData.tenantid;

export interface UiConfig {
  googleFont: string,
  appBannerUrl: string,
  appTitle: string,
  homeTitle: string,
  peopleTitle: string,
  calendarTitle: string,
  policyTitle: string,
  moreTitle: string,
  searchPromptText: string,
  homeSvg: string,
  peopleSvg: string,
  calendarSvg: string,
  policySvg: string,
  moreSvg: string,
  loginTopBarColor: string,
  loginContainerColor: string,
  loginBackgroundColor: string,
  loginButtonsColor: string,
  loginTextFieldColor: string,
  backgroundColor: string,
  headingColor: string,
  textColor: string,
  textFieldColor: string,
  topSearchColor: string,
  topSearchBoarderColor: string,
  topBarColor: string,
  breadCrumbBarColor: string,
  breadCrumbColorRgb: string,
  bottomBarColor: string,
  widgets1Color: string,
  widgets2Color: string,
  bottomButttonSelectedColor: string,
  bottomButttonUnselectedColor: string,
  buttonColor: string,
  buttonTextColor: string,
  heading1FontSize: string,
  heading2FontSize: string,
  heading3FontSize: string,
  footerFontSize: string,
  normalTextFontSize: string,
  avatarTextFontSize: string,
  smallSpacing: string,
  mediumSpacing: string,
  largeSpacing: string,
  searchSvg: string,
  backSvg: string,
  favouriteSvg: string,
  messageSvg: string,
  phoneCallSvg: string
}

const anInitialState :UiConfig = {
  googleFont: "",
  appBannerUrl: "",
  appTitle: "",
  homeTitle: "",
  peopleTitle: "",
  calendarTitle: "",
  policyTitle: "",
  moreTitle: "",
  searchPromptText: "",
  homeSvg: "",
  peopleSvg: "",
  calendarSvg: "",
  policySvg: "",
  moreSvg: "",
  loginTopBarColor: "",
  loginContainerColor: "",
  loginBackgroundColor: "",
  loginButtonsColor: "",
  loginTextFieldColor: "",
  backgroundColor: "",
  headingColor: "",
  textColor: "",
  textFieldColor: "",
  topSearchColor: "",
  topSearchBoarderColor: "",
  topBarColor: "",
  breadCrumbBarColor: "",
  breadCrumbColorRgb: "",
  bottomBarColor: "",
  widgets1Color: "",
  widgets2Color: "",
  bottomButttonSelectedColor: "",
  bottomButttonUnselectedColor: "",
  buttonColor: "",
  buttonTextColor: "",
  heading1FontSize: "",
  heading2FontSize: "",
  heading3FontSize: "",
  footerFontSize: "",
  normalTextFontSize: "",
  avatarTextFontSize: "",
  smallSpacing: "",
  mediumSpacing: "",
  largeSpacing: "",
  searchSvg: "",
  backSvg: "",
  favouriteSvg: "",
  messageSvg: "",
  phoneCallSvg: ""
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
    const response = await fetch(`http://127.0.0.1:8080/UiConfig/${tenantid}`, {
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