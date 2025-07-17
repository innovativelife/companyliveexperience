import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ReplyInfoSkeleton = () => {
  return (
    <div className="flex w-full flex-row items-start justify-start gap-x-3">
      <div className="h-text w-15 mx-auto">
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          width="100%"
          height="70%"
        />
      </div>
      <div className="h-subtext w-8 mx-auto">
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

export default ReplyInfoSkeleton;
