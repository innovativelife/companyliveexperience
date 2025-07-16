import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssTokenSetter from "./cssTokenSetter";
import { useGetUiConfigByTenantQuery } from "./features/uiConfig/uiConfigAPI";

import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setUser } from "./features/auth/authSlice";
import { auth } from "../firebaseConfig";
import { useEffect } from "react";
import { setUiConfig } from "./features/uiConfig/uiConfigSlice";

import HomePageSkeleton from "./components/PageSkeletons/HomePageSkeleton";
import PostPageSkeleton from "./components/PageSkeletons/PostPageSkeleton";
import NewPostPageSkeleton from "./components/PageSkeletons/NewPostPageSkeleton";
import NoPageSkeleton from "./components/PageSkeletons/NoPageSkeleton";

import Spinner from "./components/Spinner/Spinner";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/HomePage"));
const Post = lazy(() => import("./pages/PostPage"));
const NewPost = lazy(() => import("./pages/NewPostPage"));
const NoPage = lazy(() => import("./pages/NoPage"));
const Login = lazy(() => import("./pages/SignInPage"));

// Create Routes for all the pages
export default function App() {
  const dispatch = useDispatch();

  // Auth setup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });
    return () => unsubscribe();
  }, []);

  // UI Config
  const { data: uiConfig, isLoading, isError } = useGetUiConfigByTenantQuery();

  useEffect(() => {
    if (uiConfig) {
      dispatch(setUiConfig(uiConfig));
    }
  }, [uiConfig, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !uiConfig)
    return (
      <p className="errorMessage" data-oid="7a3q_j2">
        Error loading UI config
      </p>
    );

  return (
    <BrowserRouter data-oid="z21o2cr">
      <CssTokenSetter uiConfig={uiConfig} data-oid=":5c6uxo" />

      <Routes data-oid="r01at4u">
        <Route
          path="/"
          element={<Layout data-oid="orlgny3" />}
          data-oid="objg-jn"
        >
          <Route
            index
            element={
              <Suspense fallback={<div>Loading login...</div>}>
                <Login data-oid="ehdazux" />
              </Suspense>
            }
            data-oid="u-m6rhi"
          />

          <Route
            path="login"
            element={
              <Suspense fallback={<div>Loading login...</div>}>
                <Login data-oid="x710.m3" />
              </Suspense>
            }
            data-oid="cw6ld.h"
          />

          <Route
            path="home"
            element={
              <Suspense fallback={<HomePageSkeleton />}>
                <Home data-oid="_ntgjou" />
              </Suspense>
            }
            data-oid=".:wxfzt"
          />

          <Route
            path="home/post/:postId"
            element={
              <Suspense fallback={<PostPageSkeleton />}>
                <Post data-oid="13fe448" />
              </Suspense>
            }
            data-oid="_vuwhm3"
          />

          <Route
            path="home/newpost"
            element={
              <Suspense fallback={<NewPostPageSkeleton />}>
                <NewPost data-oid="k8p056z" />
              </Suspense>
            }
            data-oid="usifg-u"
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<NoPageSkeleton />}>
                <NoPage data-oid="jfzmy13" />
              </Suspense>
            }
            data-oid="5v7m:s3"
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
