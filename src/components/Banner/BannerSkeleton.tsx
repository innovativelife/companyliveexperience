import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Make sure this is imported somewhere in your app

const BannerSkeleton = () => {
  return (
    <div className="py-3 px-0 h-80 w-full">
      <Skeleton
        height="100%"
        className="w-full rounded-none"
        baseColor="#e5e7eb"
        highlightColor="#f3f4f6"
      />
    </div>
  );
};

export default BannerSkeleton;
