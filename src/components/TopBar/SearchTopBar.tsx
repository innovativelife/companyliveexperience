import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import "./TopBar.css";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import { UiConfig } from "../../features/uiConfig/uiConfigSlice";

export type SearchTopBarUI = {
  topBarColor: string;
  topSearchColor: string;
  breadCrumbBarColor: string;
};

type SearchTopBarProps = {
  searchBarInitialText: string;
  uiConfig: UiConfig;
  onSearch: (term: string) => void;
};

const SearchTopBar = ({
  searchBarInitialText,
  uiConfig,
  onSearch,
}: SearchTopBarProps) => {
  const root = document.documentElement;
  root.style.setProperty("--color-topBar", uiConfig.topBarColor);
  root.style.setProperty("--color-topSearch", uiConfig.topSearchColor);
  root.style.setProperty("--color-breadCrumbBar", uiConfig.breadCrumbBarColor);

  return (
    <div className="searchTopBar topBar">
      <SearchBar
        uiConfig={uiConfig}
        onSearch={onSearch}
        searchBarInitialText={searchBarInitialText}
      />
      <BreadCrumbs uiConfig={uiConfig} />
    </div>
  );
};

export default SearchTopBar;
