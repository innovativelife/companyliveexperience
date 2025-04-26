import React from "react";
import SvgButton from "../SvgButton/SvgButton";
import { useNavigate } from "react-router-dom";
import { Employee } from "../../features/employees/employeeSlice";

type ContactListProps = {
  person: Employee;
  onFavourite: (person: string) => void;
  onEmailUser: (person: string) => void;
  onPhoneUser: (person: string) => void;
  emailSrc: string;
  phoneSrc: string;
  starSrc: string;
  long: boolean;
  shade: string;
};

const PersonContact = ({
  person,
  onFavourite,
  onEmailUser,
  onPhoneUser,
  emailSrc,
  phoneSrc,
  starSrc,
  long,
  shade,
}: ContactListProps) => {
  let navigate = useNavigate();

  if (long) {
    function handleClick() {
      navigate(person.employeeNumber);
    }

    return (
      <article className={"longContact " + shade} onClick={handleClick}>
        <SvgButton
          user={person.employeeNumber}
          onHandleClick={onFavourite}
          imgSrc={starSrc}
          styleType="favourite"
        />
        <div className="avatarContainer">
          <div className="circleAvatar">
            {person.firstName[0]}
            {person.lastName[0]}
          </div>
        </div>
        <div className="personalInfo">
          <h3>
            {person.firstName} {person.lastName}
          </h3>
          <p>{person.positionTitle}</p>
          <p>{person.personalDescription}</p>
        </div>
        <div className="contactMethods">
          <SvgButton
            user={person.employeeNumber}
            onHandleClick={onEmailUser}
            imgSrc={emailSrc}
            styleType="contact"
          />
          <SvgButton
            user={person.employeeNumber}
            onHandleClick={onPhoneUser}
            imgSrc={phoneSrc}
            styleType="contact"
          />
        </div>
      </article>
    );
  }
  return (
    <article className="shortContact">
      <div className="avatarContainer">
        <div className="circleAvatar">
          {person.firstName[0]}
          {person.lastName[0]}
        </div>
      </div>
      <div className="personalInfo">
        <h3>
          {person.firstName} {person.lastName}
        </h3>
      </div>
    </article>
  );
};

export default PersonContact;
