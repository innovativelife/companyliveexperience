import { useLocation } from "react-router-dom";

export const useCurrentPage = (): string => {
  const location = useLocation();
  const [page] = location.pathname.split("/").filter(Boolean);

  switch (page) {
    case "":
      return "home";
    case "about":
      return "about";
    case "dashboard":
      return "dashboard";
    default:
      return "unknown";
  }
};
