import React from "react";
import LoggedOutTopBar from "./LoggedOutTopBar";
import SearchTopBar from "./SearchTopBar";
import PlainTopBar from "./PlainTopBar";

type PlainTopBarProps = {
  topBarType: string;
  topImg: string;
  backgroundColour: string;
  primaryColour: string;
  headerColour: string;
  searchBarText: string;
  onSearch: (term: string) => void;
  searchIconSrc: string;
};

const TopBar = ({
  topBarType,
  topImg,
  backgroundColour,
  primaryColour,
  headerColour,
  searchBarText,
  onSearch,
  searchIconSrc,
}: PlainTopBarProps) => {
  //Finds the top bar type
  switch (topBarType) {
    case "loggedOut":
      return (
        <LoggedOutTopBar topImg={topImg} headerLoggedOutColour={headerColour} />
      );
    case "search":
      return (
        <SearchTopBar
          primaryColour={primaryColour}
          headerColour={headerColour}
          backgroundColour={backgroundColour}
          searchBarText={searchBarText}
          onSearch={onSearch}
          searchIconSrc={searchIconSrc}
        />
      );
    default:
      return (
        <PlainTopBar
          topImg={topImg}
          primaryColour={primaryColour}
          headerColour={headerColour}
        />
      );
  }
};

export default TopBar;
