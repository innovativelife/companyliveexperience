//Css
// import "./Post.css";

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
    <div data-oid="post-container">
      <UserBar
        employee={employee}
        descriptor={timeAgo(post.timeSent)}
        data-oid="post-userbar"
      />

      {/* Message (conditionally rendered) */}
      {hasMessage && (
        <p className="pt-1 pr-4 pb-3 pl-4" data-oid="post-message">
          {post.message}
        </p>
      )}

      {/* Image Block (conditionally rendered) */}
      {hasImage && (
        <div className="flex py-3 px-0" data-oid="post-image-container">
          <img
            className="w-full object-cover object-center aspect-[3/2] flex-1"
            src={post.imageURL}
            alt="Post content"
            data-oid="post-image"
          />
        </div>
      )}
    </div>
  );
};

export default Post;
