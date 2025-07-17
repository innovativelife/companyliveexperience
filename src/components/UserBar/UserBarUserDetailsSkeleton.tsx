import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const UserBarUserDetailsSkeleton = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="h-text w-25">
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          width="100%"
          height="70%"
        />
      </div>
      <div className="h-subtext w-10">
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          width="100%"
          height="70%"
        />
      </div>
    </div>
  );
};

export default UserBarUserDetailsSkeleton;
