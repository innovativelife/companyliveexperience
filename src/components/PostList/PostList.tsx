//Css
import "./PostList.css";

//Components
import Post from "../Post/Post";
import ActionItemBar from "../ActionItemBar/ActionItemBar";
import localData from "../../localData.json";
import { Post as PostType } from "../../features/posts/postSlice";

//Data
// import { postSelector } from "../../features/posts/postSlice";

type PostListProps = {
  posts?: PostType[];
};

const PostList = ({ posts }: PostListProps) => {
  //All post Data
  // const posts = useAppSelector(postSelector).posts;
  return (
    <>
      {posts?.length === 0 ? (
        <>
          <img
            src={localData.speachBubble}
            className="speachBubble"
            alt="SpeachBubble"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = localData.ImageNotFound;
            }}
          />
          <h3>No Posts yet</h3>
        </>
      ) : (
        Array.isArray(posts) &&
        posts.map((post) => (
          <div key={post.postId}>
            <Post post={post} />
            <ActionItemBar postId={post.postId} />
          </div>
        ))
      )}
    </>
  );
};

export default PostList;
