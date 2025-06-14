import { useEffect } from "react";
import { useParams } from "react-router-dom";

//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import Post from "../components/Post/Post";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Padding from "../components/Padding/Padding";
import ReplyList from "../components/ReplyList/ReplyList";
import PostInput from "../components/ReplyInput/ReplyInput";

//Data
import { fetchPost, postSelector } from "../features/posts/postSlice";
import { fetchUiConfigs } from "../features/uiConfig/uiConfigSlice";
import { fetchEmployees } from "../features/employees/employeeSlice";
import { fetchReplies } from "../features/replies/repliesSlice";
import localData from "../localData.json";

const PostPage = () => {
  //Top bar data
  const iconPath = localData.svgPaths.back;
  const topBarButtonLocation = "/home";

  //Chanel data
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const post = useAppSelector(postSelector).singlePost;

  //All post Data
  useEffect(() => {
    dispatch(fetchPost(postId ?? ""));
  }, [dispatch]);

  //All replies data
  useEffect(() => {
    dispatch(fetchReplies(postId ?? ""));
  }, [dispatch]);

  //All employee Data
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  //All graphic data
  useEffect(() => {
    dispatch(fetchUiConfigs());
  }, [dispatch]);

  return (
    <>
      <TopBar
        title="Post"
        icon={iconPath}
        buttonClickLocation={topBarButtonLocation}
      />
      <Post post={post} />
      <ReplyList />
      <PostInput postId={postId ?? ""} />
      <NavBar />

      <Padding />
    </>
  );
};

export default PostPage;
