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

import { useNavigate } from 'react-router-dom';

//Data
import { svgs } from "../assets/svgs";
import { useGetRepliesQuery } from "../features/replies/repliesAPI";
import { useGetPostByIdQuery } from "../features/posts/postAPI";
import { useGetEmployeesQuery } from "../features/employees/employeeAPI";

const PostPage = () => {
  const { tenantId } = useParams();
  //Top bar data
  const iconPath = svgs.back;
  
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This is the recommended way to go back!
  };

  //Chanel data
  const { postId } = useParams();
  const {
    data: post,
    isFetching: postIsFetching,
    isError: postIsError,
    refetch: postRefetch,
  } = useGetPostByIdQuery({tenantId: tenantId ?? "", postId: postId ?? ""});

  const {
    data: replies,
    isFetching: repliesIsFetching,
    isError: repliesIsError,
    refetch: repliesRefetch,
  } = useGetRepliesQuery({tenantId: tenantId ?? "", postId: postId ?? ""}, {
    pollingInterval: 30000000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: employees,
    isFetching: employeesIsFetching,
    isError: employeesIsError,
    refetch: employeesRefetch,
  } = useGetEmployeesQuery({tenantId: tenantId ?? ""}, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const employeeMap = useMemo(() => {
    return Object.fromEntries(
      (employees ?? []).map((employee) => [employee.employeeUID, employee]),
    );
  }, [employees]);

  const refetchAll = async () => {
    await Promise.all([employeesRefetch(), postRefetch(), repliesRefetch()]);
  };

  return (
    <PullToRefresh
      onRefresh={() => refetchAll().then(() => {})}
      style={{ minHeight: "100vh" }}
      data-oid="7eprzru"
    >
      <TopBar
        title="Post"
        icon={iconPath}
        onClick={handleGoBack}
        data-oid="3h_kbqw"
      />

      {post ? (
        <Post
          post={post}
          employee={employeeMap[post.employeeUID]}
          data-oid="wd6jzrt"
        />
      ) : (
        <p data-oid="..88_op">Loading Post...</p>
      )}
      {postIsError && <p data-oid="cc4f600">Error fetching post</p>}
      {(repliesIsFetching || employeesIsFetching || postIsFetching) && (
        <Spinner data-oid="17_gqwv" />
      )}
      {repliesIsError && <p data-oid="w-qvpg_">Error fetching replies</p>}
      {employeesIsError && <p data-oid="lkx8xs1">Error fetching employees</p>}
      <ReplyList replies={replies} employees={employeeMap} data-oid="5a_2sf." />
      <PostInput postId={postId ?? ""} data-oid="ku3481y" />
      <NavBar data-oid="t60npmm" />

      <Padding data-oid="uwlq-su" />
    </PullToRefresh>
  );
};

export default PostPage;
