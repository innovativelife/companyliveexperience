import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SvgButtonSkeleton = () => {
  return (
    <div className="display-flex items-center justify-center h-8">
      <Skeleton
        baseColor="#e5e7eb"
        highlightColor="#f3f4f6"
        circle={true}
        width={24}
        height={24}
      />
    </div>
  );
};

export default SvgButtonSkeleton;
