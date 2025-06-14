import { useEffect } from "react";

//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import { useAppDispatch } from "../app/hooks";
import UserBar from "../components/UserBar/UserBar";
import Padding from "../components/Padding/Padding";
import PostWriter from "../components/PostCreation/PostWriter";

//Data
import { fetchPosts } from "../features/posts/postSlice";
import { fetchUiConfigs } from "../features/uiConfig/uiConfigSlice";
import { fetchEmployees } from "../features/employees/employeeSlice";
import localData from "../localData.json";

const NewPostPage = () => {
  //Top bar data
  const iconPath = localData.svgPaths.back;
  const topBarButtonLocation = "/home";

  //Chanel data
  const dispatch = useAppDispatch();

  //All post Data
  useEffect(() => {
    dispatch(fetchPosts());
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
        title="New Post"
        icon={iconPath}
        buttonClickLocation={topBarButtonLocation}
      />
      <UserBar
        userId={localData.userUID}
        descriptor="@AddTagToUsersInBackend"
      />
      <PostWriter />
      <NavBar />
      <Padding />
    </>
  );
};

export default NewPostPage;
