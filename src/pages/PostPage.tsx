import { useMemo } from "react";
import { useParams } from "react-router-dom";
import PullToRefresh from "react-pull-to-refresh";

//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import Post from "../components/Post/Post";
import Padding from "../components/Padding/Padding";
import ReplyList from "../components/ReplyList/ReplyList";
import PostInput from "../components/ReplyInput/ReplyInput";
import Spinner from "../components/Spinner/Spinner";

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
    isFetching: postIsFetching,
    isError: postIsError,
    refetch: postRefetch,
  } = useGetPostByIdQuery(postId ?? ""); //{ data: post, isLoading, error }

  const {
    data: replies,
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

  const refetchAll = async () => {
    await Promise.all([employeesRefetch(), postRefetch(), repliesRefetch()]);
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

      {post ? (
        <Post post={post} employee={employeeMap[post.employeeUID]} />
      ) : (
        <p>Loading Post...</p>
      )}
      {postIsError && <p className="errorMessage">Error fetching post</p>}
      {(repliesIsFetching || employeesIsFetching || postIsFetching) && (
        <Spinner />
      )}
      {repliesIsError && <p className="errorMessage">Error fetching replies</p>}
      {employeesIsError && (
        <p className="errorMessage">Error fetching employees</p>
      )}
      <ReplyList replies={replies} employees={employeeMap} />
      <PostInput postId={postId ?? ""} />
      <NavBar />

      <Padding />
    </PullToRefresh>
  );
};

export default PostPage;
