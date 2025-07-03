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
    return (
      <div
        className={`bg-red-500 text-white rounded-full flex items-center justify-center font-bold uppercase ${
          size === "small" ? "w-10 h-10 text-sm" : "w-14 h-14 text-base"
        }`}
      >
        {initials}
      </div>
    );
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
