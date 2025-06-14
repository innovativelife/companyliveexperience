import { useLocation } from "react-router-dom";

export const useCurrentPage = (): string => {
  const location = useLocation();
  const [page] = location.pathname.split("/").filter(Boolean);

  switch (page) {
    case "":
      return "Home";
    case "home":
      return "Home";
    case "about":
      return "About";
    case "dashboard":
      return "Dashboard";
    default:
      return "unknown";
  }
};
