/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from "react";
import BreadCrumb from "./BreadCrumb";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useLocation, useNavigate } from "react-router-dom";

import "./BreadCrumbs.css";
import { UiConfig } from "../../features/uiConfig/uiConfigSlice";

type BreadCrumbsProps = {
  uiConfig: UiConfig;
};

const BreadCrumbs = ({ uiConfig }: BreadCrumbsProps) => {
  // Stores the current location of the file
  const location = useLocation().pathname;
  // Stores the names of all the sections of the file path
  const sectionNames = location.split("/").filter(Boolean);

  // console.log(uiConfig);

  // Navigate to the previous page
  let navigate = useNavigate();
  function handleClick() {
    // Makes sure there are pages to go back to
    if (sectionNames.length > 1) {
      // Find the current page
      const currentPage = sectionNames[sectionNames.length - 1];
      //Remove the current page from the link
      const previousPage = location.split(currentPage)[0];
      navigate(previousPage);
    }
  }

  return (
    <div className="breadCrumbs" role="presentation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="black"
        onClick={handleClick}
      >
        <path d={uiConfig.backSvg} />
      </svg>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        {sectionNames.map((section, index) => {
          //Splits the current location at the section's name. It then adds it back to get the link
          const breadcrumbLink = location.split(section)[0] + section;
          return (
            <BreadCrumb
              uiConfig={uiConfig}
              key={index}
              locationName={section}
              link={breadcrumbLink}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
