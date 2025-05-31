import type { RootState } from "../../app/store";
import { createSelector } from "reselect";

export const selectGoogleFont = (state: RootState) =>
  state.ui.uiConfigs.googleFont;
export const selectAppBannerUrl = (state: RootState) =>
  state.ui.uiConfigs.appBannerUrl;
export const selectAppTitle = (state: RootState) => state.ui.uiConfigs.appTitle;

export const selectBackgroundColor = (state: RootState) =>
  state.ui.uiConfigs.backgroundColor;
export const selectHeadingColor = (state: RootState) =>
  state.ui.uiConfigs.headingColor;
export const selectTextColor = (state: RootState) =>
  state.ui.uiConfigs.textColor;
export const selectTextFieldColor = (state: RootState) =>
  state.ui.uiConfigs.textFieldColor;
export const selectButtonColor = (state: RootState) =>
  state.ui.uiConfigs.buttonColor;
export const selectButtonTextColor = (state: RootState) =>
  state.ui.uiConfigs.buttonTextColor;
export const selectTopBarColor = (state: RootState) =>
  state.ui.uiConfigs.topBarColor;

export const selectHeading1FontSize = (state: RootState) =>
  state.ui.uiConfigs.heading1FontSize;
export const selectHeading2FontSize = (state: RootState) =>
  state.ui.uiConfigs.heading2FontSize;
export const selectHeading3FontSize = (state: RootState) =>
  state.ui.uiConfigs.heading3FontSize;
export const selectFooterFontSize = (state: RootState) =>
  state.ui.uiConfigs.footerFontSize;
export const selectNormalTextFontSize = (state: RootState) =>
  state.ui.uiConfigs.normalTextFontSize;
export const selectAvatarTextFontSize = (state: RootState) =>
  state.ui.uiConfigs.avatarTextFontSize;

export const selectSmallSpacing = (state: RootState) =>
  state.ui.uiConfigs.smallSpacing;
export const selectMediumSpacing = (state: RootState) =>
  state.ui.uiConfigs.mediumSpacing;
export const selectLargeSpacing = (state: RootState) =>
  state.ui.uiConfigs.largeSpacing;

//Data used by the bottom bar
export const selectBottomBarData = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    homeTitle: uiConfigs.homeTitle,
    peopleTitle: uiConfigs.peopleTitle,
    calendarTitle: uiConfigs.calendarTitle,
    policyTitle: uiConfigs.policyTitle,
    moreTitle: uiConfigs.moreTitle,
    homeSvg: uiConfigs.homeSvg,
    peopleSvg: uiConfigs.peopleSvg,
    calendarSvg: uiConfigs.calendarSvg,
    policySvg: uiConfigs.policySvg,
    moreSvg: uiConfigs.moreSvg,
    bottomBarColor: uiConfigs.bottomBarColor,
  })
);

//Data used by the bottom bar buttons
export const selectBottomBarButtonData = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    bottomButttonSelectedColor: uiConfigs.bottomButttonSelectedColor,
    bottomButttonUnselectedColor: uiConfigs.bottomButttonUnselectedColor,
  })
);

export const selectLoginData = (state: RootState) => ({
  loginTopBarColor: state.ui.uiConfigs.loginTopBarColor,
  loginContainerColor: state.ui.uiConfigs.loginContainerColor,
  loginBackgroundColor: state.ui.uiConfigs.loginBackgroundColor,
  loginButtonsColor: state.ui.uiConfigs.loginButtonsColor,
  loginTextFieldColor: state.ui.uiConfigs.loginTextFieldColor,
});

export const selectSearchBarData = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    topSearchColor: uiConfigs.topSearchColor,
    topSearchBoarderColor: uiConfigs.topSearchBoarderColor,
    searchSvg: uiConfigs.searchSvg,
    searchPromptText: uiConfigs.searchPromptText,
  })
);

export const selectBreadCrumbBarColor = (state: RootState) =>
  state.ui.uiConfigs.breadCrumbBarColor;
export const selectBackSvg = (state: RootState) => state.ui.uiConfigs.backSvg;
export const selectBreadCrumbColorRgb = (state: RootState) =>
  state.ui.uiConfigs.breadCrumbColorRgb;

export const selectAlternatingColours = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    widgets1Color: uiConfigs.widgets1Color,
    widgets2Color: uiConfigs.widgets2Color,
  })
);

export const selectContactSvgs = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    favouriteSvg: uiConfigs.favouriteSvg,
    messageSvg: uiConfigs.messageSvg,
    phoneCallSvg: uiConfigs.phoneCallSvg,
  })
);

// export const selectContactSvgs = (state: RootState) => ({
//   favouriteSvg: state.ui.uiConfigs.favouriteSvg,
//   messageSvg: state.ui.uiConfigs.messageSvg,
//   phoneCallSvg: state.ui.uiConfigs.phoneCallSvg,
// });
