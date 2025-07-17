import PostSkeleton from "../Post/PostSkeleton";
import ActionItemBarSkeleton from "../ActionItemBar/ActionItemBarSkeleton";
const PostListSkeleton = () => {
  return (
    <>
      <div>
        <PostSkeleton />

        <ActionItemBarSkeleton />
      </div>
      <div>
        <PostSkeleton />

        <ActionItemBarSkeleton />
      </div>
      <div>
        <PostSkeleton />

        <ActionItemBarSkeleton />
      </div>
    </>
  );
};

export default PostListSkeleton;
