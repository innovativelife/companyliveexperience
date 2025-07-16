import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostContentSkeleton = () => {
  return (
    <div>
      <div className="pt-1 pr-4 pb-3 pl-4 h-text w-60">
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          width="100%"
          height="70%"
        />
      </div>
      <div className="py-3 px-0 h-50 w-full">
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PostContentSkeleton;
