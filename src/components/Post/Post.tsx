//Components
import UserBar from "../UserBar/UserBar";
import { timeAgo } from "../../hooks/timeAgo";

//Data Types
import { PostType } from "../../features/posts/postTypes";
import { Employee } from "../../features/employees/employeeTypes";

type PostProps = {
  post: PostType;
  postLoading: boolean;
  employee?: Employee;
  employeeLoading: boolean;
};

const Post = ({ post, employee, employeeLoading }: PostProps) => {
  //Check the messages contents
  const hasImage = Boolean(post.imageURL);
  const hasMessage = Boolean(post.message);
  // console.log(`${employee} ${employeeLoading}`);

  return (
    <div>
      <UserBar
        employee={employee}
        descriptor={timeAgo(post.timeSent)}
        employeeLoading={employeeLoading}
      />

      {/* Message (conditionally rendered) */}
      {hasMessage && <p className="pt-1 pr-4 pb-3 pl-4">{post.message}</p>}

      {/* Image Block (conditionally rendered) */}
      {hasImage && (
        <div className="flex py-3 px-0">
          <img
            //w-full object-cover object-center aspect-[3/2] flex-1
            //max-w-full h-auto block mx-auto my-6
            className="max-w-full h-auto block mx-auto my-6"
            src={post.imageURL}
            alt="Post content"
          />
        </div>
      )}
    </div>
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
