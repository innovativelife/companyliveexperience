import { useEffect } from "react";
import { useSelector } from "react-redux";

//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PostList from "../components/PostList/PostList";
import Banner from "../components/Banner/Banner";
import Padding from "../components/Padding/Padding";

//Data
import { fetchPosts } from "../features/posts/postSlice";
import { fetchUiConfigs } from "../features/uiConfig/uiConfigSlice";
import { fetchEmployees } from "../features/employees/employeeSlice";
import { selectPages } from "./../features/uiConfig/uiSelectors";
import localData from "../localData.json";

const Home = () => {
  //Top bar data
  const { homeTitle } = useSelector(selectPages);
  const iconPath = localData.svgPaths.plus;
  const topBarButtonLocation = "/";

  //Chanel data
  const dispatch = useAppDispatch();

  //All post Data
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  //All post Data
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
        title={homeTitle}
        icon={iconPath}
        buttonClickLocation={topBarButtonLocation}
      />
      <Banner />
      <PostList />
      <NavBar />
      <Padding />
    </>
  );
};

export default Home;
