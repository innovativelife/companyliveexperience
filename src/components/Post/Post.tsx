//Css
import "./Post.css";

//Components
import UserBar from "../UserBar/UserBar";
import { timeAgo } from "../../hooks/timeAgo";

//Data Types
import { PostType } from "../../features/posts/postTypes";
import { Employee } from "../../features/employees/employeeTypes";

type PostProps = { post: PostType; employee?: Employee };

const Post = ({ post, employee }: PostProps) => {
  //Check the messages contents
  const hasImage = Boolean(post.imageURL);
  const hasMessage = Boolean(post.message);

  return (
    <div className="post">
      <UserBar employee={employee} descriptor={timeAgo(post.timeSent)} />

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
