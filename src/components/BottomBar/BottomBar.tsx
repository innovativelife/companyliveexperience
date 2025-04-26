import React from "react";
import BottomBarButton from "./BottomBarButton";
import "./BottomBar.css";
import { PageButton } from "./BottomBarButton";
import tokens from "../../temporaryData.json";

type BottomBarProps = {
  pageButtons: PageButton[];
  currentPage: string;
};

const BottomBar = ({ pageButtons, currentPage }: BottomBarProps) => {
  const root = document.documentElement;
  root.style.setProperty("--color-footer", tokens.colours.footerColorHex);

  return (
    <nav id="bottomBar">
      {pageButtons.map((page) => {
        return (
          <BottomBarButton
            pageButton={page}
            key={page.name}
            isCurrentPage={
              page.name.toLowerCase() === currentPage.toLowerCase()
            }
          />
        );
      })}
    </nav>
  );
};

export default BottomBar;
