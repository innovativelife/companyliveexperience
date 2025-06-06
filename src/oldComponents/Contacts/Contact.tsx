// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { createSelector } from "reselect";

// //Components
// import SvgButton from "../SvgButton/SvgButton";

// //Data
// import { Employee } from "../../features/employees/employeeSlice";
// import {
//   selectContactSvgs,
//   selectNormalTextFontSize,
// } from "../../features/uiConfig/uiSelectors";

// type ContactListProps = {
//   person: Employee;
//   onFavourite: (person: string) => void;
//   onEmailUser: (person: string) => void;
//   onPhoneUser: (person: string) => void;
//   long: boolean;
//   shade: string;
// };

// const PersonContact = ({
//   person,
//   onFavourite,
//   onEmailUser,
//   onPhoneUser,
//   long,
//   shade,
// }: ContactListProps) => {
//   //Get imported data
//   const normalTextFontSize = useSelector(selectNormalTextFontSize);
//   const { favouriteSvg, messageSvg, phoneCallSvg } =
//     useSelector(selectContactSvgs);

//   const root = document.documentElement;
//   root.style.setProperty("(--size-normalText", normalTextFontSize);

//   let navigate = useNavigate();

//   if (long) {
//     function handleClick() {
//       navigate(person.employeeNumber);
//     }

//     return (
//       <article className={"longContact " + shade} onClick={handleClick}>
//         <SvgButton
//           user={person.employeeNumber}
//           onHandleClick={onFavourite}
//           imgSrc={favouriteSvg}
//           styleType="favourite"
//         />
//         <div className="avatarContainer">
//           <div className="circleAvatar">
//             {person.firstName[0]}
//             {person.lastName[0]}
//           </div>
//         </div>
//         <div className="personalInfo">
//           <h3>
//             {person.firstName} {person.lastName}
//           </h3>
//           <p>{person.positionTitle}</p>
//           <p>{person.personalDescription}</p>
//         </div>
//         <div className="contactMethods">
//           <SvgButton
//             user={person.employeeNumber}
//             onHandleClick={onEmailUser}
//             imgSrc={messageSvg}
//             styleType="contact"
//           />
//           <SvgButton
//             user={person.employeeNumber}
//             onHandleClick={onPhoneUser}
//             imgSrc={phoneCallSvg}
//             styleType="contact"
//           />
//         </div>
//       </article>
//     );
//   }
//   return (
//     <article className="shortContact">
//       <div className="avatarContainer">
//         <div className="circleAvatar">
//           {person.firstName[0]}
//           {person.lastName[0]}
//         </div>
//       </div>
//       <div className="personalInfo">
//         <h3>
//           {person.firstName} {person.lastName}
//         </h3>
//       </div>
//     </article>
//   );
// };

// export default PersonContact;
