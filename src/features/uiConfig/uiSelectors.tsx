import type { RootState } from "../../app/store";
import { createSelector } from "reselect";

export const selectGoogleFont = (state: RootState) =>
  state.ui.uiConfigs.googleFont;
export const selectAppBannerUrl = (state: RootState) =>
  state.ui.uiConfigs.appBannerUrl;
export const selectAppTitle = (state: RootState) => state.ui.uiConfigs.appTitle;

//Page Titles
export const selectPages = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    homeTitle: uiConfigs.homeTitle,
    peopleTitle: uiConfigs.peopleTitle,
    calendarTitle: uiConfigs.calendarTitle,
    tribesTitle: uiConfigs.tribesTitle,
    moreTitle: uiConfigs.moreTitle,
  })
);

//Font Sizes
export const selectFontSize = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    titleFontSize: uiConfigs.titleFontSize,
    headingFontSize: uiConfigs.headingFontSize,
    textFontSize: uiConfigs.textFontSize,
    subTextFontSize: uiConfigs.subTextFontSize,
  })
);

//Spacings
export const selectSpacing = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    smallSpacing: uiConfigs.smallSpacing,
    mediumSpacing: uiConfigs.mediumSpacing,
    largeSpacing: uiConfigs.largeSpacing,
  })
);

//Colors
export const selectColors = createSelector(
  (state: RootState) => state.ui.uiConfigs,
  (uiConfigs) => ({
    primaryColor: uiConfigs.primaryColor,
    secondaryColor: uiConfigs.secondaryColor,
    tertiaryColor: uiConfigs.tertiaryColor,
    backgroundColor: uiConfigs.backgroundColor,
    textColor: uiConfigs.textColor,
    inputsColor: uiConfigs.inputsColor,
  })
);
