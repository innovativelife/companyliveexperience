import ReactDOM from "react-dom/client";
import React from "react";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

// Global CSS Variables
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

  return null;
};

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const NoPage = lazy(() => import("./pages/NoPage"));
const People = lazy(() => import("./pages/Peope"));

// Create Routes for all the pages
export default function App() {
  return (
    <BrowserRouter>
      <CssTokenSetter />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="people" element={<People />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
