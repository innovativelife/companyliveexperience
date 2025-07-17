//Components
import UserBar from "../UserBar/UserBar";
import { timeAgo } from "../../hooks/timeAgo";
import ReplyPanel from "../ReplyList/ReplyList";
import ActionItemBar from "../ActionItemBar/ActionItemBar";
import PostContent from "../PostContent/PostContent";

//Data Types
import { PostType } from "../../features/posts/postTypes";
import { Employee } from "../../features/employees/employeeTypes";

import { useState } from "react";

type PostProps = {
  post: PostType;
  postLoading: boolean;
  employees?: Record<string, Employee>;
  employeeLoading: boolean;
};

const Post = ({ post, employees, employeeLoading }: PostProps) => {
  //Stores whether replies should be stored
  const [showReplies, setShowReplies] = useState(false);

  //Toggles the replies state to turn it off/on onclick
  const toggleRepliesState = () => {
    setShowReplies((prevShowReplies) => !prevShowReplies); // Use the updater function
  };

  //TODO implement reactions
  function likeFunction() {
    console.log("You liked a post");
  }

  return (
    <>
      <UserBar
        employee={employees?.[post.employeeUID]}
        descriptor={timeAgo(post.timeSent)}
        employeeLoading={employeeLoading}
      />

      <PostContent message={post.message} imageURL={post.imageURL} />

      <ActionItemBar
        likeFunction={likeFunction}
        repliesFunction={toggleRepliesState}
      />
      {showReplies && (
        <div className="pl-[40px]">
          <ReplyPanel
            postId={post.postId}
            employees={employees}
            employeeLoading={employeeLoading}
          />
        </div>
      )}
    </>
  );
};

export default Post;

{
  /* Message (conditionally rendered) */
}
// {hasMessage && (
//   <p className="pt-1 pr-4 pb-3 pl-4" data-oid="7r3ilvz">
//     {post.message}
//   </p>
// )}

// {/* Image Block (conditionally rendered) */}
// {hasImage && (
//   <div className="flex py-3 px-0" data-oid="i6jsra-">
//     <img
//       //w-full object-cover object-center aspect-[3/2] flex-1
//       //max-w-full h-auto block mx-auto my-6
//       className="max-w-full h-auto block mx-auto my-6"
//       src={post.imageURL}
//       alt="Post content"
//       data-oid="8:c9a7."
//     />
//   </div>
// )}
