import AvatarSkeleton from "../Avatar/AvatarSkeleton";
import ReplyInfoSkeleton from "../ReplyInfo/ReplyInfoSkeleton";
import ReplyMessageSkeleton from "./ReplyMessageSkeleton";
import ActionItemSkeleton from "../ActionItem/ActionItemSkeleton";

const ReplySkeleton = () => {
  return (
    <div className="flex w-full flex-row box-border flex-row items-start justify-star gap-3 p-4">
      <AvatarSkeleton size="small" />
      <div>
        <ReplyInfoSkeleton />
        <ReplyMessageSkeleton />

        <div className="flex w-full flex-row items-center justify-start gap-9 pt-2">
          <ActionItemSkeleton />
        </div>
      </div>
    </div>
  );
};

export default ReplySkeleton;
