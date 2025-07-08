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

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/HomePage"));
const Post = lazy(() => import("./pages/PostPage"));
const NewPost = lazy(() => import("./pages/NewPostPage"));
const NoPage = lazy(() => import("./pages/NoPage"));
const Login = lazy(() => import("./pages/SignInPage"));

// Create Routes for all the pages
export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user)); // <- This ensures state.auth.user gets set
    });

    return () => unsubscribe();
  }, []);

  const { data: uiConfig, isLoading, isError } = useGetUiConfigByTenantQuery();

  useEffect(() => {
    if (uiConfig) {
      dispatch(setUiConfig(uiConfig));
    }
  }, [uiConfig, dispatch]);

  if (isLoading) return <div data-oid="j2seb4j">Loading UI config...</div>;
  if (isError || !uiConfig)
    return (
      <p className="errorMessage" data-oid="3z9a46p">
        Error loading UI config
      </p>
    );

  return (
    <BrowserRouter data-oid="y2i.foh">
      <CssTokenSetter uiConfig={uiConfig} data-oid="5ivtcak" />
      <Suspense
        fallback={
          <div className="container" data-oid="ps2dwyw">
            Loading...
          </div>
        }
        data-oid=":-174ol"
      >
        <Routes data-oid="8825.9:">
          <Route
            path="/"
            element={<Layout data-oid="md:f0xa" />}
            data-oid="u-xjy-k"
          >
            <Route
              index
              element={<Login data-oid="4bu2gsx" />}
              data-oid="3.x5lw2"
            />

            <Route
              path="login"
              element={<Login data-oid="hytk3cc" />}
              data-oid="8tq-p8t"
            />

            <Route
              path="home"
              element={<Home data-oid="p0zk6-g" />}
              data-oid="sk-uspw"
            />

            <Route
              path="home/post/:postId"
              element={<Post data-oid="r9kb8k8" />}
              data-oid="2wozfo6"
            />

            <Route
              path="home/newpost"
              element={<NewPost data-oid=".4ak2po" />}
              data-oid="u4eoaqg"
            />

            <Route
              path="*"
              element={<NoPage data-oid="uh:qw8l" />}
              data-oid="hi81gl5"
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
