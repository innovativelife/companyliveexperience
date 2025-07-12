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
