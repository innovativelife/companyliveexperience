//Css
// import "./PostList.css";

//Components
import Post from "../Post/Post";
import ActionItemBar from "../ActionItemBar/ActionItemBar";

//Data
import { images } from "../../assets/images";
import { PostType } from "../../features/posts/postTypes";
import { Employee } from "../../features/employees/employeeTypes";

type PostListProps = {
  posts?: PostType[];
  employees?: Record<string, Employee>;
};

const PostList = ({ posts, employees }: PostListProps) => {
  //All post Data
  // const posts = useAppSelector(postSelector).posts;
  return (
    <>
      {posts?.length === 0 ? (
        <>
          <img
            src={images.speachBubble}
            className="w-full h-auto p-4 box-border rounded-5"
            alt="SpeachBubble"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = images.ImageNotFound;
            }}
            data-oid="pnm.ur0"
          />

          <h3 data-oid="18g7.55">No Posts yet</h3>
        </>
      ) : (
        Array.isArray(posts) &&
        posts.map((post) => (
          <div key={post.postId} data-oid="xy0cp0m">
            <Post
              post={post}
              employee={employees?.[post.employeeUID]}
              data-oid="dpa:rd8"
            />

            <ActionItemBar postId={post.postId} data-oid="4p1cl7k" />
          </div>
        ))
      )}
    </>
  );
};

export default PostList;
