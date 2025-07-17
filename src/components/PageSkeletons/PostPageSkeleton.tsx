import TopBarSkeleton from "../TopBar/TopBarSkeleton";
import PostSkeleton from "../Post/PostSkeleton";
import ReplyListSkeleton from "../ReplyList/ReplyListSkeleton";
import ReplyInputSkeleton from "../ReplyInput/ReplyInputSkeleton";
import NavBarSkeleton from "../NavBar/NavBarSkeleton";
const PostPageSkeleton = () => {
  return (
    <>
      <TopBarSkeleton />

      <PostSkeleton />

      <ReplyListSkeleton />

      <ReplyInputSkeleton />

      <NavBarSkeleton />
    </>
  );
};

export default PostPageSkeleton;
