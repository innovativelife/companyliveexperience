//Css
import "./PostList.css";

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
            className="speachBubble"
            alt="SpeachBubble"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = images.ImageNotFound;
            }}
          />
          <h3>No Posts yet</h3>
        </>
      ) : (
        Array.isArray(posts) &&
        posts.map((post) => (
          <div key={post.postId}>
            <Post post={post} employee={employees?.[post.employeeUID]} />
            <ActionItemBar postId={post.postId} />
          </div>
        ))
      )}
    </>
  );
};

export default PostList;
