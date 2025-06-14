import TopBar from "../components/TopBar/TopBar";
import Banner from "../components/Banner/Banner";
import Padding from "../components/Padding/Padding";
import LargeButton from "../components/LargeButton/LargeButton";

import localData from "../localData.json";
import { fetchUiConfigs } from "../features/uiConfig/uiConfigSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";

const NoPage = () => {
  //Chanel data
  const dispatch = useAppDispatch();

  //All graphic data
  useEffect(() => {
    dispatch(fetchUiConfigs());
  }, [dispatch]);

  //Navigation
  //Navigation
  let navigate = useNavigate();

  function handleClick() {
    navigate("/home");
  }

  //Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem", // gap-2
    maxWidth: "480px",
    margin: "0 auto",
  };

  const headingStyle: React.CSSProperties = {
    fontSize: "1.125rem", // text-lg
    lineHeight: "1.375rem", // leading-tight
    letterSpacing: "-0.015em",
    maxWidth: "480px",
    textAlign: "center",
  };

  const paragraphStyle: React.CSSProperties = {
    lineHeight: "1.5", // leading-normal
    maxWidth: "480px",
    textAlign: "center",
  };

  return (
    <>
      <TopBar
        title="Page Not Found"
        icon={localData.svgPaths.back}
        buttonClickLocation="/home"
      />
      <Banner />
      <Padding />
      <div style={containerStyle}>
        <h2 style={headingStyle}>Oops! Page not found</h2>
        <p style={paragraphStyle}>
          The page you're looking for doesn't seem to exist. Please check the
          URL or try navigating back to the main site.
        </p>
      </div>
      <LargeButton onClick={handleClick} label="Go Back" />
    </>
  );
};

export default NoPage;
