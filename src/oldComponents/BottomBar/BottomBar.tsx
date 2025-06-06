// import React from "react";
// import { useSelector } from "react-redux";

// //Css
// import "./BottomBar.css";

// //Components
// import BottomBarButton from "./BottomBarButton";
// import MessageInput from "../MessageInput/MessageInput";

// //Data
// import { selectBottomBarData } from "../../features/uiConfig/uiSelectors";

// type BottomBarProps = {
//   currentPage: string;
//   showMessageBar: boolean;
// };

// const BottomBar = ({ currentPage, showMessageBar }: BottomBarProps) => {
//   const {
//     homeTitle,
//     homeSvg,
//     peopleTitle,
//     peopleSvg,
//     calendarTitle,
//     calendarSvg,
//     policyTitle,
//     policySvg,
//     moreTitle,
//     moreSvg,
//     bottomBarColor,
//   } = useSelector(selectBottomBarData);

//   const root = document.documentElement;
//   root.style.setProperty("--color-footer", bottomBarColor);

//   const pageButtons = [
//     {
//       name: homeTitle,
//       imgSrc: homeSvg,
//       location: `/${homeTitle}`.toLowerCase(),
//     },
//     {
//       name: peopleTitle,
//       imgSrc: peopleSvg,
//       location: `/${peopleTitle}`.toLowerCase(),
//     },
//     {
//       name: calendarTitle,
//       imgSrc: calendarSvg,
//       location: `/${calendarTitle}`.toLowerCase(),
//     },
//     {
//       name: policyTitle,
//       imgSrc: policySvg,
//       location: `/${policyTitle}`.toLowerCase(),
//     },
//     {
//       name: moreTitle,
//       imgSrc: moreSvg,
//       location: `/${moreTitle}`.toLowerCase(),
//     },
//   ];

//   return (
//     <div id="bottomBar">
//       {showMessageBar && <MessageInput />}
//       <div id="bottomNavBar">
//         {pageButtons.map((page, index) => {
//           return (
//             //Check the page has a name
//             page.name && (
//               <BottomBarButton
//                 pageButton={page}
//                 key={page.name}
//                 isCurrentPage={
//                   page.name.toLowerCase() === currentPage.toLowerCase()
//                 }
//               />
//             )
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BottomBar;
