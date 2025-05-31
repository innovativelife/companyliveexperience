import React, { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

//Components
import SearchTopBar from "../components/TopBar/SearchTopBar/SearchTopBar";
import BottomBar from "../components/BottomBar/BottomBar";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import PostList from "../components/Posts/PostList";

//Data
import { fetchPosts, postSelector } from "../features/posts/postSlice";
import { fetchUiConfigs } from "../features/uiConfig/uiConfigSlice";

const Home = () => {
  //Search bar data
  const search = useCallback((term: string) => {
    console.log(`Searching ${term}`);
  }, []);

  //Page Data
  const currentPage = useLocation().pathname.split("/").filter(Boolean)[0];

  //Chanel data
  const [currentChannel, setCurrentChannel] = useState("all");

  const dispatch = useAppDispatch();

  //All employee Data
  const posts = useAppSelector(postSelector).posts;
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  //All graphic data
  useEffect(() => {
    dispatch(fetchUiConfigs());
  }, [dispatch]);

  return (
    <>
      <SearchTopBar onSearch={search} />
      <PostList posts={posts} />
      <BottomBar currentPage={currentPage} showMessageBar={true} />
      <div className="bottomMessagePading" />
    </>
  );
};

export default Home;
