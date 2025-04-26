import React, { useState, useCallback, ChangeEvent } from "react";
import "./SearchBar.css";
import { UiConfig } from "../../features/uiConfig/uiConfigSlice";

type SearchBarProps = {
  uiConfig: UiConfig;
  onSearch: (term: string) => void;
  searchBarInitialText: string;
};

const SearchBar = ({
  uiConfig,
  onSearch,
  searchBarInitialText,
}: SearchBarProps) => {
  const root = document.documentElement;
  root.style.setProperty("--color-topSearch", uiConfig.topSearchColor);
  root.style.setProperty(
    "--color-topSearchBoarder",
    uiConfig.topSearchBoarderColor
  );
  root.style.setProperty("--size-normalText", uiConfig.normalTextFontSize);
  root.style.setProperty("--color-normalText", uiConfig.textColor);

  const [term, setTerm] = useState("");

  const handleTermChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setTerm(event.target.value);
    },
    []
  );

  const search = useCallback(() => {
    onSearch(term);
  }, [onSearch, term]);

  return (
    <form className="search" onSubmit={search}>
      <input
        type="text"
        className="searchTerm"
        placeholder={searchBarInitialText}
        onChange={handleTermChange}
      />
      <button type="submit" className="searchButton">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d={uiConfig.searchSvg} />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
