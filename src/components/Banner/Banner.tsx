import { useState, useEffect, useRef } from "react";
import BannerSkeleton from "./BannerSkeleton";

type BannerProps = {
  bannerUrl?: string;
  fallbackImageUrl: string;
};

const Banner = ({ bannerUrl, fallbackImageUrl }: BannerProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState(
    bannerUrl || fallbackImageUrl,
  );
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null); // Ref to the img element

  // Effect to handle changes in bannerUrl
  useEffect(() => {
    setIsImageLoaded(false);
    setHasTriedFallback(false);

    if (bannerUrl) {
      setCurrentImageUrl(bannerUrl);
    } else {
      setCurrentImageUrl(fallbackImageUrl);
      setHasTriedFallback(true);
    }
  }, [bannerUrl, fallbackImageUrl]);

  // Effect to handle image loading (initial or after URL change)
  useEffect(() => {
    if (imgRef.current) {
      if (imgRef.current.complete) {
        setIsImageLoaded(true);
      }
    }
  }, [currentImageUrl]);

  const handleImageError = () => {
    if (!hasTriedFallback) {
      setHasTriedFallback(true);
      setCurrentImageUrl(fallbackImageUrl);
      setIsImageLoaded(false); // Keep skeleton visible while fallback loads
    } else {
      console.error(
        "Both original and fallback images failed to load:",
        currentImageUrl,
      );
      setIsImageLoaded(true);
    }
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <div className="w-full h-64 sm:h-80 md:h-96 lg:h-[33vh]">
      {
        !isImageLoaded ? (
          <BannerSkeleton />
        ) : null /* Render img always to ensure onLoad/onError can attach */
      }
      <img
        ref={imgRef} // Attach the ref
        src={currentImageUrl}
        className={`w-full h-full object-cover rounded-none object-top ${
          !isImageLoaded ? "hidden" : ""
        }`} // Hide if not loaded
        alt="Company Banner"
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default Banner;
