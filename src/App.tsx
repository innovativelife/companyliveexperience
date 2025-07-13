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

// The main application component. Sets up routing, authentication state management,
// and UI configuration. Fetches UI settings based on the tenant ID found in the URL
// and applies them using CSS variables.
export default function App() {

  // Set up tracking of user auth status via redux
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user));
    });

    return () => unsubscribe();
  }, []);

  // Get tenant details from URL
  const pathSegments = window.location.pathname.split('/');
  let tenantId = pathSegments[1];
  console.log("TenantId from URL: " + tenantId);

  // Get Ui config - this is an unautenticated request
  const { data: uiConfig, isLoading, isError } = useGetUiConfigByTenantQuery({tenantId: tenantId});
  useEffect(() => {
    if (uiConfig) {
      dispatch(setUiConfig(uiConfig));
    }
  }, [uiConfig, dispatch]);

  // Display messages while data loading
  // ToDo: Skeletins when loading?
  // ToDo: Improve error handling - UI Config could no tbe loaded (eg. May not be defined?)
  if (isLoading)
    return <div data-oid="app-loading-message">Loading UI config...</div>;
  if (isError || !uiConfig)
    return <div data-oid="app-error-message">Error loading UI config</div>;

  return (
    <BrowserRouter data-oid="app-container">
      <CssTokenSetter uiConfig={uiConfig} data-oid="app-css-token-setter" />
      <Suspense
        fallback={
          <div className="container" data-oid="app-suspense-loading-message">
            Loading...
          </div>
        }
        data-oid="app-suspense"
      >
        <Routes data-oid="app-routes">
          <Route
            path="/:tenantId/"
            element={<Layout data-oid="app-layout" />}
            data-oid="app-layout-route"
          >
            <Route
              index
              element={<Login data-oid="app-login" />}
              data-oid="app-login-route"
            />

            <Route
              path="login"
              element={<Login data-oid="app-login-2" />}
              data-oid="app-login-route-2"
            />

            <Route
              path="home"
              element={<Home data-oid="app-home" />}
              data-oid="app-home-route"
            />

            <Route
              path="home/post/:postId"
              element={<Post data-oid="app-post" />}
              data-oid="app-post-route"
            />

            <Route
              path="home/newpost"
              element={<NewPost data-oid="app-new-post" />}
              data-oid="app-new-post-route"
            />

            <Route
              path="*"
              element={<NoPage data-oid="app-no-page" />}
              data-oid="app-no-page-route"
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
