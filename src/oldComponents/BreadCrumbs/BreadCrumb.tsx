// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// //Components
// import Link from "@mui/material/Link";

// //Data
// import { selectBreadCrumbColorRgb } from "../../features/uiConfig/uiSelectors";

// type BreadCrumbProps = {
//   locationName: string;
//   link: string;
// };

// const BreadCrumb = ({ locationName, link }: BreadCrumbProps) => {
//   //Get imported data
//   const breadCrumbColorRgb = useSelector(selectBreadCrumbColorRgb);

//   // Navigate to the breadcrumbs link
//   let navigate = useNavigate();
//   function handleClick() {
//     navigate(link);
//   }

//   return (
//     <Link
//       underline="hover"
//       color={`rgb(${breadCrumbColorRgb})`}
//       href="#"
//       onClick={handleClick}
//     >
//       {locationName}
//     </Link>
//   );
// };

// export default BreadCrumb;
