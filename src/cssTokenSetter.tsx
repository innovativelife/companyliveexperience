import React from "react";

interface UiConfig {
  googleFont: string;
  appBannerUrl: string;
  appTitle: string;
  homeTitle: string;
  peopleTitle: string;
  calendarTitle: string;
  tribesTitle: string;
  moreTitle: string;
  titleFontSize: string;
  headingFontSize: string;
  textFontSize: string;
  subTextFontSize: string;
  smallSpacing: string;
  mediumSpacing: string;
  largeSpacing: string;
  primaryColor: string;
  secondaryColor: string;
  tertiaryColor: string;
  backgroundColor: string;
  textColor: string;
  inputsColor: string;
}

interface CssTokenSetterProps {
  uiConfig: UiConfig;
}

const CssTokenSetter: React.FC<CssTokenSetterProps> = ({ uiConfig }) => {
  React.useEffect(() => {
    if (!uiConfig) return;

    const root = document.documentElement;

    const {
      smallSpacing,
      mediumSpacing,
      largeSpacing,

      primaryColor,
      secondaryColor,
      tertiaryColor,
      backgroundColor,
      textColor,
      inputsColor,

      titleFontSize,
      headingFontSize,
      textFontSize,
      subTextFontSize,
    } = uiConfig;

    root.style.setProperty("--color-primary", primaryColor);
    root.style.setProperty("--color-secondary", secondaryColor);
    root.style.setProperty("--color-tertiary", tertiaryColor);
    root.style.setProperty("--color-background", backgroundColor);
    root.style.setProperty("--color-text", textColor);
    root.style.setProperty("--color-inputs", inputsColor);

    root.style.setProperty("--size-title", titleFontSize);
    root.style.setProperty("--size-heading", headingFontSize);
    root.style.setProperty("--size-text", textFontSize);
    root.style.setProperty("--size-subtext", subTextFontSize);

    root.style.setProperty("--spacing-large", largeSpacing);
    root.style.setProperty("--spacing-medium", mediumSpacing);
    root.style.setProperty("--spacing-small", smallSpacing);
  }, [uiConfig]);

  return null;
};

export default CssTokenSetter;
