import { images } from "../../assets/images";

//Css
// import "./Banner.css";

type BannarProps = { bannerUrl?: string };

const Banner = ({ bannerUrl }: BannarProps) => {
  const fallbackImageUrl = images.ImageNotFound;

  // Don't render if no image URL is available yet
  if (!bannerUrl) {
    return (
      <div className="flex items-center py-2 px-4" data-oid="bannar-loading">
        Loading...
      </div>
    );
  }

  return (
    <img
      src={bannerUrl}
      className="w-full h-auto object-cover rounded-none flex-1"
      alt="Company Banner"
      onError={(e) => {
        e.currentTarget.onerror = null; // Prevent infinite loop
        e.currentTarget.src = fallbackImageUrl;
      }}
      data-oid="bannar-image"
    />
  );
};

export default Banner;
