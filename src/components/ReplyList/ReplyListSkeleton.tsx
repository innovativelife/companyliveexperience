import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import ReplyListRepliesSkeleton from "./ReplyListRepliesSkeleton";

const ReplyListSkeleton = () => {
  return (
    <div>
      <div className="h-header w-60 mx-auto">
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          width="100%"
          height="70%"
        />
      </div>

      <ReplyListRepliesSkeleton />
    </div>
  );
};

export default ReplyListSkeleton;
