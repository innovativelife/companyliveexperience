// import React, { useState, useCallback, ChangeEvent } from "react";
// import { useSelector } from "react-redux";

// //Css
// import "./SearchBar.css";

// //Data
// import {
//   selectSearchBarData,
//   selectNormalTextFontSize,
//   selectTextColor,
// } from "../../features/uiConfig/uiSelectors";

// type SearchBarProps = {
//   onSearch: (term: string) => void;
// };

// const SearchBar = ({ onSearch }: SearchBarProps) => {
//   //Get imported data
//   const { topSearchBoarderColor, topSearchColor, searchSvg, searchPromptText } =
//     useSelector(selectSearchBarData);
//   const normalTextFontSize = useSelector(selectNormalTextFontSize);
//   const textColor = useSelector(selectTextColor);

//   //Set tokens
//   const root = document.documentElement;
//   root.style.setProperty("--color-topSearch", topSearchColor);
//   root.style.setProperty("--color-topSearchBoarder", topSearchBoarderColor);
//   root.style.setProperty("--size-normalText", normalTextFontSize);
//   root.style.setProperty("--color-normalText", textColor);

//   const [term, setTerm] = useState("");

//   const handleTermChange = useCallback(
//     (event: ChangeEvent<HTMLInputElement>) => {
//       setTerm(event.target.value);
//     },
//     []
//   );

//   const search = useCallback(() => {
//     onSearch(term);
//   }, [onSearch, term]);

//   return (
//     <form className="search" onSubmit={search}>
//       <input
//         type="text"
//         className="searchTerm"
//         placeholder={searchPromptText}
//         onChange={handleTermChange}
//       />
//       <button type="submit" className="searchButton">
//         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
//           <path d={searchSvg} />
//         </svg>
//       </button>
//     </form>
//   );
// };

// export default SearchBar;
