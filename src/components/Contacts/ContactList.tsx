import React from "react";
import PersonContact from "./Contact";
import tokens from "../../temporaryData.json";
import { Employee } from "../../features/employees/employeeSlice";

import "./ContactList.css";

type ContactListProps = {
  people: Employee[];
  onFavourite: (person: string) => void;
  onEmailUser: (person: string) => void;
  onPhoneUser: (person: string) => void;
  emailSrc: string;
  phoneSrc: string;
  starSrc: string;
  long: boolean;
};

const Contacts = ({
  people,
  onFavourite,
  onEmailUser,
  onPhoneUser,
  emailSrc,
  phoneSrc,
  starSrc,
  long,
}: ContactListProps) => {
  const root = document.documentElement;
  root.style.setProperty("--color-cardLight", tokens.colours.cardLightColorHex);
  root.style.setProperty("--color-cardDark", tokens.colours.cardDarkColorHex);
  root.style.setProperty(
    "--size-avatarText",
    tokens.fontSizes.avatarTextFontSize
  );

  return (
    <section id="contacts">
      {people.map((person, index) => {
        // Checks if the card is odd or even so that it can alternate between light and dark
        const shade = index % 2 ? "dark" : "light";
        return (
          <PersonContact
            key={index}
            person={person}
            onFavourite={onFavourite}
            onEmailUser={onEmailUser}
            onPhoneUser={onPhoneUser}
            emailSrc={emailSrc}
            phoneSrc={phoneSrc}
            starSrc={starSrc}
            long={long}
            shade={shade}
          />
        );
      })}
    </section>
  );
};

export default Contacts;
