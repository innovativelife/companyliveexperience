import AvatarSkeleton from "../Avatar/AvatarSkeleton";
import UserBarUserDetailsSkeleton from "./UserBarUserDetailsSkeleton";

const UserBarSkeleton = () => {
  return (
    <div className="flex items-center gap-4 py-2 px-4 min-h-[72px]">
      {/* <img className="avatar" src={sender?.avatarURL} /> */}
      <AvatarSkeleton size="large" />
      <UserBarUserDetailsSkeleton />
    </div>
  );
};

export default UserBarSkeleton;
