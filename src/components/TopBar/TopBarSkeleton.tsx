import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TopBarSkeleton = () => {
  return (
    <div className="sticky top-0 flex justify-between items-center p-4 pb-2 bg-primary z-50">
      {/* Icon Placeholder */}
      <div className="flex h-12 w-12 items-center shrink-0">
        <Skeleton
          baseColor="#374151"
          highlightColor="#4b5563"
          circle={true}
          width={48}
          height={48}
        />
      </div>

      {/* Title Placeholder */}
      <div
        className="flex-1 pr-12 flex justify-center items-center" // <-- Add flex, justify-center, items-center
      >
        <div className="h-7 w-30">
          <Skeleton
            baseColor="#374151"
            highlightColor="#4b5563"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBarSkeleton;
