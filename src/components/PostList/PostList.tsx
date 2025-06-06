import { useEffect } from "react";

//Css
// import "./PostList.css";

//Components
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Post from "../Post/Post";

//Data
import { postSelector } from "../../features/posts/postSlice";

type PostListProps = {};

const PostList = ({}: PostListProps) => {
  //All employee Data
  const posts = useAppSelector(postSelector).posts;

  return (
    <>
      {posts.map((post) => (
        <Post key={post.postId} post={post} />
      ))}
    </>
  );
};

export default PostList;
