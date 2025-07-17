//Components
import Post from "../Post/Post";
import PostListSkeleton from "./PostListSkeleton";

//Data
import { images } from "../../assets/images";
import { PostType } from "../../features/posts/postTypes";
import { Employee } from "../../features/employees/employeeTypes";

type PostListProps = {
  posts?: PostType[];
  postLoading: boolean;
  employees?: Record<string, Employee>;
  employeeLoading: boolean;
};

const PostList = ({
  posts,
  postLoading,
  employees,
  employeeLoading,
}: PostListProps) => {
  if (postLoading) {
    return <PostListSkeleton />;
  } else if (posts?.length === 0) {
    return (
      <>
        <img
          src={images.speachBubble}
          className="w-full h-auto p-4 box-border rounded-5"
          alt="SpeachBubble"
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop
            e.currentTarget.src = images.ImageNotFound;
          }}
        />

        <h3>No Posts yet</h3>
      </>
    );
  } else {
    return (
      Array.isArray(posts) &&
      posts.map((post) => (
        <div key={post.postId}>
          <Post
            post={post}
            postLoading={postLoading}
            employees={employees}
            employeeLoading={employeeLoading}
          />
        </div>
      ))
    );
  }
};

export default PostList;
