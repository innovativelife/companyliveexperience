import TopBarSkeleton from "../TopBar/TopBarSkeleton";
import BannerSkeleton from "../Banner/BannerSkeleton";
import Padding from "../Padding/Padding";
import LargeButtonSkeleton from "../LargeButton/LargeButtonSkeleton";
const NoPageSkeleton = () => {
  return (
    <>
      <TopBarSkeleton />

      <BannerSkeleton />
      <Padding />
      {/* <div style={containerStyle}>
        <h2 style={headingStyle}>Oops! Page not found</h2>
        <p style={paragraphStyle}>
          The page you're looking for doesn't seem to exist. Please check the
          URL or try navigating back to the main site.
        </p>
      </div> */}
      <LargeButtonSkeleton />
    </>
  );
};

export default NoPageSkeleton;
