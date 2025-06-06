import React from "react";
import "./TopBar.css";

type LoggedOutTopBarProps = {
  topImg: string;
  headerLoggedOutColour: string;
};

const LoggedOutTopBar = ({
  topImg,
  headerLoggedOutColour,
}: LoggedOutTopBarProps) => {
  const root = document.documentElement;
  root.style.setProperty("--color-headerLoggedOut", headerLoggedOutColour);

  return (
    <div className="loggedOutTopBar topBar">
      <img src={topImg} alt="Company logo" />
    </div>
  );
};

export default LoggedOutTopBar;
