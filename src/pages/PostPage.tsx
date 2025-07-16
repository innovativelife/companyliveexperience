import { useMemo } from "react";
import { useParams } from "react-router-dom";
import PullToRefresh from "react-pull-to-refresh";

//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import Post from "../components/Post/Post";
import Padding from "../components/Padding/Padding";
import ReplyList from "../components/ReplyList/ReplyList";
import ReplyInput from "../components/ReplyInput/ReplyInput";
import Spinner from "../components/Spinner/Spinner";
import PostSkeleton from "../components/Post/PostSkeleton";

//Data
import { svgs } from "../assets/svgs";
import { useGetRepliesQuery } from "../features/replies/repliesAPI";
import { useGetPostByIdQuery } from "../features/posts/postAPI";
import { useGetEmployeesQuery } from "../features/employees/employeeAPI";

const PostPage = () => {
  //Top bar data
  const iconPath = svgs.back;
  const topBarButtonLocation = "/home";

  //Chanel data
  const { postId } = useParams();
  const {
    data: post,
    isLoading: postsIsLoading,
    isFetching: postIsFetching,
    isError: postIsError,
    refetch: postRefetch,
  } = useGetPostByIdQuery(postId ?? ""); //{ data: post, isLoading, error }

  const {
    data: replies,
    isLoading: repliesIsLoading,
    isFetching: repliesIsFetching,
    isError: repliesIsError,
    refetch: repliesRefetch,
  } = useGetRepliesQuery(postId ?? "", {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: employees,
    isLoading: employeesIsLoading,
    isFetching: employeesIsFetching,
    isError: employeesIsError,
    refetch: employeesRefetch,
  } = useGetEmployeesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const employeeMap = useMemo(() => {
    return Object.fromEntries(
      (employees ?? []).map((employee) => [employee.employeeUID, employee])
    );
  }, [employees]);

  // Determine if background fetching is happening for spinner
  const isBackgroundFetching =
    (postIsFetching && !postsIsLoading) ||
    (employeesIsFetching && !employeesIsLoading) ||
    (repliesIsFetching && !repliesIsLoading);

  const refetchAll = async () => {
    await Promise.all([employeesRefetch(), postRefetch(), repliesRefetch()]);
  };

  const renderPost = () => {
    if (postsIsLoading) return <PostSkeleton />;
    else if (!post || postIsError)
      return <p className="errorMessage">Error fetching post</p>;
    else
      return (
        <Post
          post={post}
          postLoading={postsIsLoading}
          employee={employeeMap[post.employeeUID]}
          employeeLoading={employeesIsLoading}
        />
      );
  };

  return (
    <PullToRefresh
      onRefresh={() => refetchAll().then(() => {})}
      style={{ minHeight: "100vh" }}
    >
      <TopBar
        title="Post"
        icon={iconPath}
        buttonClickLocation={topBarButtonLocation}
      />

      {/* Render post as a skeleton, error or post */}
      {renderPost()}

      {/* Apply Spinner for background  reload*/}
      {isBackgroundFetching && <Spinner />}

      {/* Show error messages if their are problems fetchinreplies or employees*/}
      {repliesIsError && <p className="errorMessage">Error fetching replies</p>}
      {employeesIsError && (
        <p className="errorMessage">Error fetching employees</p>
      )}

      <ReplyList
        replies={replies}
        replyLoading={repliesIsLoading}
        employees={employeeMap}
        employeeLoading={employeesIsLoading}
      />

      <ReplyInput postId={postId ?? ""} employeeLoading={employeesIsLoading} />

      <NavBar />

      <Padding />
    </PullToRefresh>
  );
};

export default PostPage;
