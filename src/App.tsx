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

  if (isLoading) return <div>Loading UI config...</div>;
  if (isError) return <div>Error loading UI config 1</div>;
  if (!uiConfig) return <div>Error loading UI config 2</div>;
  if (isError || !uiConfig) return <div>Error loading UI config</div>;

  return (
    <BrowserRouter>
      <CssTokenSetter uiConfig={uiConfig} />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="home/post/:postId" element={<Post />} />
            <Route path="home/newpost" element={<NewPost />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
