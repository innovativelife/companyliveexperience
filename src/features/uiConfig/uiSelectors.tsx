import { RootState } from "../../app/store";
import { createSelector } from "reselect";

const base = (state: RootState) => state.ui.uiConfigs;

export const selectFont = createSelector(base, (ui) => ({
  googleFont: ui?.googleFont,
}));

export const selectAppBannerUrl = createSelector(base, (ui) => ({
  appBannerUrl: ui?.appBannerUrl,
}));

export const selectPages = createSelector(base, (ui) => ({
  homeTitle: ui?.homeTitle,
  peopleTitle: ui?.peopleTitle,
  calendarTitle: ui?.calendarTitle,
  tribesTitle: ui?.tribesTitle,
  moreTitle: ui?.moreTitle,
}));

export const selectFontSize = createSelector(base, (ui) => ({
  titleFontSize: ui?.titleFontSize,
  headingFontSize: ui?.headingFontSize,
  textFontSize: ui?.textFontSize,
  subTextFontSize: ui?.subTextFontSize,
}));

export const selectSpacing = createSelector(base, (ui) => ({
  smallSpacing: ui?.smallSpacing,
  mediumSpacing: ui?.mediumSpacing,
  largeSpacing: ui?.largeSpacing,
}));

export const selectColors = createSelector(base, (ui) => ({
  primaryColor: ui?.primaryColor,
  secondaryColor: ui?.secondaryColor,
  tertiaryColor: ui?.tertiaryColor,
  backgroundColor: ui?.backgroundColor,
  textColor: ui?.textColor,
  inputsColor: ui?.inputsColor,
}));

// import type { RootState } from "../../app/store";
// import { createSelector } from "reselect";

// export const selectGoogleFont = (state: RootState) =>
//   state.ui.uiConfigs.googleFont;
// export const selectAppBannerUrl = (state: RootState) =>
//   state.ui.uiConfigs.appBannerUrl;
// export const selectAppTitle = (state: RootState) => state.ui.uiConfigs.appTitle;

// //Page Titles
// export const selectPages = createSelector(
//   (state: RootState) => state.ui.uiConfigs,
//   (uiConfigs) => ({
//     homeTitle: uiConfigs.homeTitle,
//     peopleTitle: uiConfigs.peopleTitle,
//     calendarTitle: uiConfigs.calendarTitle,
//     tribesTitle: uiConfigs.tribesTitle,
//     moreTitle: uiConfigs.moreTitle,
//   })
// );

// //Font Sizes
// export const selectFontSize = createSelector(
//   (state: RootState) => state.uiConfigApi.uiConfigs,
//   (uiConfigs) => ({
//     titleFontSize: uiConfigs.titleFontSize,
//     headingFontSize: uiConfigs.headingFontSize,
//     textFontSize: uiConfigs.textFontSize,
//     subTextFontSize: uiConfigs.subTextFontSize,
//   })
// );

// //Spacings
// export const selectSpacing = createSelector(
//   (state: RootState) => state.,
//   (uiConfigs) => ({
//     smallSpacing: uiConfigs.smallSpacing,
//     mediumSpacing: uiConfigs.mediumSpacing,
//     largeSpacing: uiConfigs.largeSpacing,
//   })
// );

// //Colors
// export const selectColors = createSelector(
//   (state: RootState) => state.ui.uiConfigs,
//   (uiConfigs) => ({
//     primaryColor: uiConfigs.primaryColor,
//     secondaryColor: uiConfigs.secondaryColor,
//     tertiaryColor: uiConfigs.tertiaryColor,
//     backgroundColor: uiConfigs.backgroundColor,
//     textColor: uiConfigs.textColor,
//     inputsColor: uiConfigs.inputsColor,
//   })
// );
