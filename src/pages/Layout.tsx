import { Outlet } from "react-router-dom";

const Layout = () => {
  // Layout is blank for now
  return (
    <>
      <Outlet data-oid="layout-outlet" />
    </>
  );
};

export default Layout;
