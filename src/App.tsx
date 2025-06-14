import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssTokenSetter } from "./main";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/HomePage"));
const Post = lazy(() => import("./pages/PostPage"));
const NewPost = lazy(() => import("./pages/NewPostPage"));
const NoPage = lazy(() => import("./pages/NoPage"));

// Create Routes for all the pages
export default function App() {
  return (
    <BrowserRouter>
      <CssTokenSetter />
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
