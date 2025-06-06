// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// //Css
// import "./BottomBarButton.css";

// //Data
// import { selectBottomBarButtonData } from "../../features/uiConfig/uiSelectors";

// export interface PageButton {
//   name: string;
//   imgSrc: string;
//   location: string;
// }

// type BottomBarBottomProps = {
//   pageButton: PageButton;
//   isCurrentPage: boolean;
// };

// const BottomBarButton = ({
//   pageButton,
//   isCurrentPage,
// }: BottomBarBottomProps) => {
//   //Get imported data
//   const { bottomButttonSelectedColor, bottomButttonUnselectedColor } =
//     useSelector(selectBottomBarButtonData);

//   //Set tokens
//   const root = document.documentElement;
//   root.style.setProperty(
//     "--color-unselectedFooterContent",
//     bottomButttonUnselectedColor
//   );
//   root.style.setProperty("--size-footerText", bottomButttonSelectedColor);

//   const selectionStatus = isCurrentPage
//     ? "buttonContent selectedNav"
//     : "buttonContent unselectedNav";

//   let navigate = useNavigate();

//   function handleClick() {
//     navigate(pageButton.location);
//   }

//   return (
//     <div className={selectionStatus} onClick={handleClick}>
//       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
//         <path d={pageButton.imgSrc} />
//       </svg>
//       <h4>{pageButton.name}</h4>
//     </div>
//   );
// };

// export default BottomBarButton;
