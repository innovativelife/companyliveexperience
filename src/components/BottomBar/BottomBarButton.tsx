import React from "react";
import "./BottomBarButton.css";
import tokens from "../../temporaryData.json";
import { useNavigate } from "react-router-dom";

export interface PageButton {
  name: string;
  imgSrc: string;
  location: string;
}

type BottomBarBottomProps = {
  pageButton: PageButton;
  isCurrentPage: boolean;
};

const BottomBarButton = ({
  pageButton,
  isCurrentPage,
}: BottomBarBottomProps) => {
  const root = document.documentElement;
  root.style.setProperty(
    "--color-unselectedFooterContent",
    tokens.colours.footerContentColorHex
  );
  root.style.setProperty("--size-footerText", tokens.fontSizes.footerFontSize);

  const selectionStatus = isCurrentPage
    ? "buttonContent selectedNav"
    : "buttonContent unselectedNav";

  let navigate = useNavigate();

  function handleClick() {
    navigate(pageButton.location);
  }

  return (
    <div className={selectionStatus} onClick={handleClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
        <path d={pageButton.imgSrc} />
      </svg>
      <h4>{pageButton.name}</h4>
    </div>
  );
};

export default BottomBarButton;
