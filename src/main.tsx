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

//Data
import {
  selectHeadingColor,
  selectTextColor,
  selectBackgroundColor,
  selectHeading1FontSize,
  selectHeading2FontSize,
  selectHeading3FontSize,
  selectNormalTextFontSize,
  selectSmallSpacing,
  selectMediumSpacing,
  selectLargeSpacing,
} from "./features/uiConfig/uiSelectors";
// import { selectHeading4FontSize } from "./features/uiConfig/uiSelectors";

const CssTokenSetter = () => {
  //Set tokens
  const headingColor = useSelector(selectHeadingColor);
  const textColor = useSelector(selectTextColor);
  const backgroundColor = useSelector(selectBackgroundColor);
  const heading1FontSize = useSelector(selectHeading1FontSize);
  const heading2FontSize = useSelector(selectHeading2FontSize);
  const heading3FontSize = useSelector(selectHeading3FontSize);
  // const heading4FontSize = useSelector(selectHeading4FontSize);
  // Add colour for subheading
  const normalTextFontSize = useSelector(selectNormalTextFontSize);
  const smallSpacing = useSelector(selectSmallSpacing);
  const mediumSpacing = useSelector(selectMediumSpacing);
  const largeSpacing = useSelector(selectLargeSpacing);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--color-heading1", headingColor);
    root.style.setProperty("--color-subHeading", headingColor);
    root.style.setProperty("--color-text", textColor);
    root.style.setProperty("--color-background", backgroundColor);
    root.style.setProperty("--size-heading1", heading1FontSize);
    root.style.setProperty("--size-heading2", heading2FontSize);
    root.style.setProperty("--size-heading3", heading3FontSize);
    // root.style.setProperty("--size-heading4", heading4FontSize);
    root.style.setProperty("--size-normalText", normalTextFontSize);
    root.style.setProperty("--spacing-large", largeSpacing);
    root.style.setProperty("--spacing-medium", mediumSpacing);
    root.style.setProperty("--spacing-small", smallSpacing);
  }, [
    headingColor,
    textColor,
    backgroundColor,
    heading1FontSize,
    heading2FontSize,
    heading3FontSize,
    normalTextFontSize,
    smallSpacing,
    mediumSpacing,
    largeSpacing,
  ]);

  return null; // this component just sets tokens
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
