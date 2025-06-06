import { useSelector } from "react-redux";

//Css
import "./Banner.css";

//Import data
import { selectAppBannerUrl } from "../../features/uiConfig/uiSelectors";

type BannerProps = {};

const Banner = ({}: BannerProps) => {
  const appBannerUrl = useSelector(selectAppBannerUrl);

  return (
    <div className="bannerContainer">
      <img src={appBannerUrl} alt="Company Banner" />
    </div>
  );
};

export default Banner;
