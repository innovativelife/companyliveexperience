// import Skeleton from "react-loading-skeleton";
// import "react-loading-skeleton/dist/skeleton.css";
import NavItemSkeleton from "../NavItem/NavItemSkeleton";

const NavBarSkeleton = () => {
  return (
    <div className="bg-tertiary w-full fixed box-border bottom-0 flex gap-2 border-t border-[#f3f0e7] px-4 pb-3 pt-2">
      <NavItemSkeleton />
      <NavItemSkeleton />
      <NavItemSkeleton />
      <NavItemSkeleton />
      <NavItemSkeleton />
    </div>
  );
};

export default NavBarSkeleton;
