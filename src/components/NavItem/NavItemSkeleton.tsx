import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NavItemSkeleton = () => {
  return (
    <div className={`flex flex-col items-center justify-end gap-1 flex-1 `}>
      <div className={"flex items-center justify-center h-8"}>
        <Skeleton
          baseColor="#374151"
          highlightColor="#4b5563"
          circle={true}
          width={24}
          height={24}
        />
      </div>
      <div className="h-subtext w-8 mx-auto">
        <Skeleton
          baseColor="#374151"
          highlightColor="#4b5563"
          width="100%"
          height="70%"
        />
      </div>
    </div>
  );
};

export default NavItemSkeleton;
