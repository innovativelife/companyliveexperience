import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Make sure this is imported somewhere in your app

type AvatarSkeletonProps = { size: string };

const AvatarSkeleton = ({ size }: AvatarSkeletonProps) => {
  const dimension = size === "small" ? 40 : 56;

  return (
    <Skeleton
      circle
      baseColor="#e5e7eb"
      highlightColor="#f3f4f6"
      width={dimension}
      height={dimension}
    />
  );
};

export default AvatarSkeleton;
