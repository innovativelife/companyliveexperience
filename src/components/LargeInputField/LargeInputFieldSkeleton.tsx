import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Make sure this is imported somewhere in your app

const LargeInputFieldSkeleton = () => {
  return (
    <div className="flex flex-wrap items-end gap-4 py-3 px-4 box-border">
      <div className="flex flex-col min-w-40 flex-1 box-border">
        <div className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-text focus:outline-0 focus:ring-0 border-none bg-inputs focus:border-none min-h-36 placeholder:text-secondary p-4 text-base font-normal leading-normal">
          <Skeleton
            height="100%"
            width="100%"
            className="w-full rounded-none"
            baseColor="#e5e7eb"
            highlightColor="#f3f4f6"
          />
        </div>
      </div>
    </div>
  );
};

export default LargeInputFieldSkeleton;
