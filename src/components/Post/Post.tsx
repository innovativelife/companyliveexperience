//Css
import "./Post.css";

//Components
import UserBar from "../UserBar/UserBar";
import { timeAgo } from "../../hooks/timeAgo";

//Data Types
import { Post as PostType } from "../../features/posts/postSlice";

type PostProps = { post: PostType };

const Post = ({ post }: PostProps) => {
  //Check the messages contents
  const hasImage = Boolean(post.imageURL);
  const hasMessage = Boolean(post.message);

  return (
    <div className="post">
      <UserBar userId={post.employeeUID} descriptor={timeAgo(post.timeSent)} />

      {/* Message (conditionally rendered) */}
      {hasMessage && <p className="message">{post.message}</p>}

      {/* Image Block (conditionally rendered) */}
      {hasImage && (
        <div className="imageContainer">
          <img className="mainImage" src={post.imageURL} alt="Post content" />
        </div>
      )}
    </div>
  );
};

export default Post;
