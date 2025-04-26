import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";

import SearchTopBar from "../components/TopBar/SearchTopBar";
import BottomBar from "../components/BottomBar/BottomBar";

// import HorizontalCards from "../components/HorizontalCards/HorizontalCards";
import { PageButton } from "../components/BottomBar/BottomBarButton";
import sampleData from "../temporaryData.json";

const Home = () => {
  //Search bar data
  const search = useCallback((term: string) => {
    console.log(`Searching ${term}`);
  }, []);

  //Page Data
  const pageButtons: PageButton[] = sampleData.pageButtons;
  const currentPage = useLocation().pathname.split("/").filter(Boolean)[0];

  return (
    <>
      <SearchTopBar
        searchBarText={sampleData.searchBar.searchBarText}
        primaryColour={sampleData.colours.primaryColorHex}
        backgroundColour={sampleData.colours.backgroundColorHex}
        headerColour={sampleData.colours.headerColorHex}
        onSearch={search}
        searchIconSrc={sampleData.searchBar.imgSrc}
      />

      <BottomBar pageButtons={pageButtons} currentPage={currentPage} />
    </>
  );
};

export default Home;
