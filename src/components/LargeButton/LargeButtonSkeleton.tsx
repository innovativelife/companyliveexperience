import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Make sure this is imported somewhere in your app

const LargeButtonSkeleton = () => {
  return (
    <div className="flex py-3 px-4">
      <div className="w-full min-w-[84px] max-w-[480px] h-12 px-5">
        <Skeleton
          className="rounded-full mx-auto"
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          borderRadius={9999}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default LargeButtonSkeleton;
