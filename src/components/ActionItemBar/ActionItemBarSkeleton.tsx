import ActionItemSkeleton from "../ActionItem/ActionItemSkeleton";

const ActionItemBarSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-between gap-4 pl-[20px] pr-[20px] pb-[18px] pt-[6px]">
      <ActionItemSkeleton />
      <ActionItemSkeleton />
    </div>
  );
};

export default ActionItemBarSkeleton;
