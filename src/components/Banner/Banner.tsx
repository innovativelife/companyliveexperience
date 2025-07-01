import { images } from "../../assets/images";

//Css
import "./Banner.css";

type BannarProps = { bannerUrl?: string };

const Banner = ({ bannerUrl }: BannarProps) => {
  const fallbackImageUrl = images.ImageNotFound;

  // Don't render if no image URL is available yet
  if (!bannerUrl) {
    return <div className="bannerPlaceholder">Loading...</div>;
  }

  return (
    <div className="bannerContainer">
      <img
        src={bannerUrl}
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
