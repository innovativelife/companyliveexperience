import { useSelector } from "react-redux";
import localData from "../../localData.json";

//Css
import "./Banner.css";

//Import data
import { selectAppBannerUrl } from "../../features/uiConfig/uiSelectors";

type BannerProps = {};

const Banner = ({}: BannerProps) => {
  const appBannerUrl = useSelector(selectAppBannerUrl);
  const fallbackImageUrl = localData.ImageNotFound;

  // Don't render if no image URL is available yet
  if (!appBannerUrl) {
    return <div className="bannerPlaceholder">Loading...</div>;
  }

  return (
    <div className="bannerContainer">
      <img
        src={appBannerUrl}
        alt="Company Banner"
        onError={(e) => {
          e.currentTarget.onerror = null; // Prevent infinite loop
          e.currentTarget.src = fallbackImageUrl;
        }}
      />
    </div>
  );
};

export default Banner;
