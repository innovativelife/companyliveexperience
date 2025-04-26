import React from "react";
import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";
import { UiConfig } from "../../features/uiConfig/uiConfigSlice";

type BreadCrumbProps = {
  uiConfig: UiConfig;
  locationName: string;
  link: string;
};

const BreadCrumb = ({ locationName, link, uiConfig }: BreadCrumbProps) => {
  let navigate = useNavigate();

  // Navigate to the breadcrumbs link
  function handleClick() {
    navigate(link);
  }

  return (
    <Link
      underline="hover"
      color={`rgb(${uiConfig.breadCrumbColorRgb})`}
      href="#"
      onClick={handleClick}
    >
      {locationName}
    </Link>
  );
};

export default BreadCrumb;
