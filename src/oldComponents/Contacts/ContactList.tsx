// import React from "react";
// import { useSelector } from "react-redux";

// //Css
// import "./ContactList.css";

// //Components
// import PersonContact from "./Contact";

// //Data
// import { Employee } from "../../features/employees/employeeSlice";
// import {
//   selectAlternatingColours,
//   selectAvatarTextFontSize,
// } from "../../features/uiConfig/uiSelectors";

// type ContactListProps = {
//   people: Employee[];
//   onFavourite: (person: string) => void;
//   onEmailUser: (person: string) => void;
//   onPhoneUser: (person: string) => void;
//   long: boolean;
// };

// const Contacts = ({
//   people,
//   onFavourite,
//   onEmailUser,
//   onPhoneUser,
//   long,
// }: ContactListProps) => {
//   //Get imported data
//   const { widgets1Color, widgets2Color } = useSelector(
//     selectAlternatingColours
//   );
//   const avatarTextFontSize = useSelector(selectAvatarTextFontSize);

//   //Set tokens
//   const root = document.documentElement;
//   root.style.setProperty("--color-cardLight", widgets1Color);
//   root.style.setProperty("--color-cardDark", widgets2Color);
//   root.style.setProperty("--size-avatarText", avatarTextFontSize);

//   return (
//     <section id="contacts">
//       {people.map((person, index) => {
//         // Checks if the card is odd or even so that it can alternate between light and dark
//         const shade = index % 2 ? "dark" : "light";
//         return (
//           <PersonContact
//             key={index}
//             person={person}
//             onFavourite={onFavourite}
//             onEmailUser={onEmailUser}
//             onPhoneUser={onPhoneUser}
//             long={long}
//             shade={shade}
//           />
//         );
//       })}
//     </section>
//   );
// };

// export default Contacts;
