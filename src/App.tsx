import ReactDOM from "react-dom/client";
import React from "react";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const NoPage = lazy(() => import("./pages/NoPage"));
const People = lazy(() => import("./pages/Peope"));

// Create Routes for all the pages
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="container">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="*" element={<NoPage />} />
            <Route path="people" element={<People />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
