import React from "react";
import ReactDOM from "react-dom/client";
import { useSelector } from "react-redux";
import { Provider } from "react-redux";

//Components
import App from "./App.tsx";

//Store
import { store } from "./app/store.ts";

//Css
import "./index.css";

import {
  selectFontSize,
  selectSpacing,
  selectColors,
} from "./features/uiConfig/uiSelectors";
// import { selectHeading4FontSize } from "./features/uiConfig/uiSelectors";

// Global CSS Variables
const CssTokenSetter = () => {
  //Set tokens
  const { smallSpacing, mediumSpacing, largeSpacing } =
    useSelector(selectSpacing);
  const {
    primaryColor,
    secondaryColor,
    tertiaryColor,
    backgroundColor,
    textColor,
    inputsColor,
  } = useSelector(selectColors);
  const { titleFontSize, headingFontSize, textFontSize, subTextFontSize } =
    useSelector(selectFontSize);

  React.useEffect(() => {
    const root = document.documentElement;
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
  });

  return null;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

export { CssTokenSetter };
