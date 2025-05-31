import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

//Css
import "./BreadCrumbs.css";

//Components
import BreadCrumb from "./BreadCrumb";
import Breadcrumbs from "@mui/material/Breadcrumbs";

//Data
import {
  selectBackSvg,
  selectBreadCrumbBarColor,
} from "../../features/uiConfig/uiSelectors";

const BreadCrumbs = () => {
  //Get imported data
  const backSvg = useSelector(selectBackSvg);
  const breadCrumbBarColor = useSelector(selectBreadCrumbBarColor);

  //Set css variables
  const root = document.documentElement;
  root.style.setProperty("--color-breadCrumbBar", breadCrumbBarColor);

  // Stores the current location of the file
  const location = useLocation().pathname;
  // Stores the names of all the sections of the file path
  const sectionNames = location.split("/").filter(Boolean);

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
        <path d={backSvg} />
      </svg>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        {sectionNames.map((section, index) => {
          //Splits the current location at the section's name. It then adds it back to get the link
          const breadcrumbLink = location.split(section)[0] + section;
          return (
            <BreadCrumb
              key={index}
              locationName={section.charAt(0).toUpperCase() + section.slice(1)}
              link={breadcrumbLink}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
