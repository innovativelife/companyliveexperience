import { useEffect } from "react";
import { useSelector } from "react-redux";
import PullToRefresh from "react-pull-to-refresh";

//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import { useAppDispatch } from "../app/hooks";
import PostList from "../components/PostList/PostList";
import Banner from "../components/Banner/Banner";
import Padding from "../components/Padding/Padding";
import Spinner from "../components/Spinner/Spinner";

//Data
import { fetchPosts } from "../features/posts/postSlice";
import { fetchUiConfigs } from "../features/uiConfig/uiConfigSlice";
import { fetchEmployees } from "../features/employees/employeeSlice";
import { selectPages } from "../features/uiConfig/uiSelectors";
import localData from "../localData.json";

import { useGetPostsQuery, useCreatePostMutation } from "../services/postAPI";

const HomePage = () => {
  //Top bar data
  const { homeTitle } = useSelector(selectPages);
  const iconPath = localData.svgPaths.plus;
  const topBarButtonLocation = "/home/newpost";

  //Chanel data
  const dispatch = useAppDispatch();

  //All post Data
  const {
    data: posts,
    isFetching,
    isError,
    refetch,
  } = useGetPostsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

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
      <PullToRefresh
        onRefresh={() => refetch().then(() => {})}
        style={{ minHeight: "100vh" }}
      >
        <TopBar
          title={homeTitle}
          icon={iconPath}
          buttonClickLocation={topBarButtonLocation}
        />
        {isFetching && <Spinner />}
        <Banner />
        <PostList posts={posts} />
        <NavBar />
        <Padding />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
