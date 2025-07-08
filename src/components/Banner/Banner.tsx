import { images } from "../../assets/images";

//Css
// import "./Banner.css";

type BannarProps = { bannerUrl?: string };

const Banner = ({ bannerUrl }: BannarProps) => {
  const fallbackImageUrl = images.ImageNotFound;

  // Don't render if no image URL is available yet
  if (!bannerUrl) {
    return (
      <div className="flex items-center py-2 px-4" data-oid="plb:lon">
        Loading...
      </div>
    );
  }

  return (
    <img
      src={bannerUrl}
      className="w-full h-auto object-cover rounded-none max-h-64 sm:max-h-80 md:max-h-96 lg:max-h-screen-1/3 object-top"
      alt="Company Banner"
      onError={(e) => {
        e.currentTarget.onerror = null; // Prevent infinite loop
        e.currentTarget.src = fallbackImageUrl;
      }}
      data-oid="wat.o3h"
    />
  );
};

export default Banner;
