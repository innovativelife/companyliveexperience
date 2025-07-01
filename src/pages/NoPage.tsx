import TopBar from "../components/TopBar/TopBar";
import Banner from "../components/Banner/Banner";
import Padding from "../components/Padding/Padding";
import LargeButton from "../components/LargeButton/LargeButton";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { svgs } from "../assets/svgs";
import { images } from "../assets/images";
import { selectAppBannerUrl } from "../features/uiConfig/uiSelectors";

const NoPage = () => {
  const appBannerUrl =
    useSelector(selectAppBannerUrl).appBannerUrl ?? images.ImageNotFound;

  //Navigation
  const navigate = useNavigate();

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
        icon={svgs.back}
        buttonClickLocation="/home"
      />
      <Banner bannerUrl={appBannerUrl} />
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
