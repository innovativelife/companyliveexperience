import PostContentSkeleton from "./PostContentSkeleton";
import UserBarSkeleton from "../UserBar/UserBarSkeleton";

const PostSkeleton = () => {
  return (
    <div>
      <UserBarSkeleton />
      <PostContentSkeleton />
    </div>
  );
};

export default PostSkeleton;
