import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ActionItemSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-2 cursor-pointer">
      <Skeleton
        baseColor="#e5e7eb"
        highlightColor="#f3f4f6"
        circle={true}
        width={24}
        height={24}
      />

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

export default ActionItemSkeleton;
