//Css
import "./Post.css";

//Components
import UserBar from "../UserBar/UserBar";
import ActionItem from "../ActionItem/ActionItem";

//Data
import localData from "../../localData.json";

//Data Types
import { Post as PostType } from "../../features/posts/postSlice";

type PostProps = { post: PostType };

const Post = ({ post }: PostProps) => {
  //Check the messages contents
  const hasImage = Boolean(post.imageURL);
  const hasMessage = Boolean(post.message);

  return (
    <div className="post">
      <UserBar userId={post.employeeUID} timeSent={post.timeSent} />

      {/* Message (conditionally rendered) */}
      {hasMessage && <p className="message">{post.message}</p>}

      {/* Image Block (conditionally rendered) */}
      {hasImage && (
        <div className="image-container">
          <img className="main-image" src={post.imageURL} alt="Post content" />
        </div>
      )}

      {/* Action Buttons */}
      <div className="action-bar">
        <ActionItem icon={localData.svgPaths.heart} count={23} />
        <ActionItem icon={localData.svgPaths.chat} count={5} />
        <ActionItem icon={localData.svgPaths.paperPlane} count={2} />
      </div>
    </div>
  );
};

export default Post;
