import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ColoredSvgButtonSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-2 bg-background py-2.5 w-20 text-center">
      <div className="display-flex items-center justify-center h-8">
        <Skeleton
          baseColor="#e5e7eb"
          highlightColor="#f3f4f6"
          circle={true}
          width={44}
          height={44}
        />
      </div>
      <div className="pt-1 pr-4 pb-3 pl-4 h-text w-20">
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

export default ColoredSvgButtonSkeleton;
