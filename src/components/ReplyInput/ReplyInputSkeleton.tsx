import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import AvatarSkeleton from "../Avatar/AvatarSkeleton";

const ReplyInputSkeleton = () => {
  return (
    <div className="flex items-center py-3 px-4 gap-3 container inline-size">
      <AvatarSkeleton size="small" />

      <div className="flex flex-col min-w-40 flex-1 h-12">
        <div className="min-w-0 flex-1 resize-none overflow-hidden border-none outline-none px-4 h-full leading-normal w-full">
          <Skeleton
            baseColor="#e5e7eb"
            highlightColor="#f3f4f6"
            width="100%"
            height="100%"
          />
        </div>
      </div>

      <Skeleton
        baseColor="#e5e7eb"
        highlightColor="#f3f4f6"
        circle={true}
        width={30}
        height={30}
      />
    </div>
  );
};

export default ReplyInputSkeleton;
{
  /* <Skeleton
        baseColor="#374151"
        highlightColor="#4b5563"
        circle={true}
        width={24}
        height={24}
        data-oid="82j:b7z"
      />
       <div className="h-subtext w-8 mx-auto" data-oid="-i94si6">
        <Skeleton
          baseColor="#374151"
          highlightColor="#4b5563"
          width="100%"
          height="70%"
          data-oid="l.wti.:"
        />
      </div> */
}
