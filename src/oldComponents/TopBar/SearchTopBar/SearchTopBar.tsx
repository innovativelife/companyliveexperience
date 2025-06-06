// import React from "react";
// import { useSelector } from "react-redux";

// //Css
// import "./SearchTopBar.css";

// //Components
// import SearchBar from "../../SearchBar/SearchBar";
// import BreadCrumbs from "../../BreadCrumbs/BreadCrumbs";

// //Data
// import { selectTopBarColor } from "../../../features/uiConfig/uiSelectors";

// type SearchTopBarProps = {
//   onSearch: (term: string) => void;
// };

// const SearchTopBar = ({ onSearch }: SearchTopBarProps) => {
//   //Get imported data
//   const topBarColor = useSelector(selectTopBarColor);

//   //Set css variables
//   const root = document.documentElement;
//   root.style.setProperty("--color-topBar", topBarColor);

//   return (
//     <div className="searchTopBar topBar">
//       <SearchBar onSearch={onSearch} />
//       <BreadCrumbs />
//     </div>
//   );
// };

// export default SearchTopBar;
