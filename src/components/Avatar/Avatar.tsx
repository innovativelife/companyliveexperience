import { useState } from "react";

//Css
import "./Avatar.css";

//Data
import { Employee } from "../../features/employees/employeeTypes";

type UserBarProps = { employee?: Employee; size?: string };

const UserBar = ({ employee, size = "large" }: UserBarProps) => {
  const [imageError, setImageError] = useState(false);

  const initials = employee
    ? `${employee.firstName.charAt(0) ?? "U"} ${
        employee.lastName.charAt(0) ?? "K"
      }`.toUpperCase()
    : "";

  if (!employee || !employee.avatarURL || imageError) {
    return <div className={`avatarTxt ${size ?? "large"}`}>{initials}</div>;
  }

  return (
    <img
      src={employee.avatarURL}
      alt={`${employee.firstName} ${employee.lastName}`}
      className={`avatarImg ${size ?? "large"}`}
      onError={() => setImageError(true)}
    />
  );
};

export default UserBar;
