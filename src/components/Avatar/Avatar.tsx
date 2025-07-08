import { useState } from "react";

//Css
// import "./Avatar.css";

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
        className={`bg-secondary text-white rounded-full flex items-center justify-center font-bold uppercase ${
          size === "small" ? "w-10 h-10 text-sm" : "w-14 h-14 text-base"
        }`}
        data-oid="j9ex96c"
      >
        {initials}
      </div>
    );
  }

  //`avatarImg ${size ?? "large"}`
  return (
    <img
      src={employee.avatarURL}
      alt={`${employee.firstName} ${employee.lastName}`}
      className={`bg-center bg-no-repeat bg-cover rounded-full ${
        size === "small" ? "w-10 h-10 text-sm" : "w-14 h-14 text-base"
      }`}
      onError={() => setImageError(true)}
      data-oid="o_-jwm7"
    />
  );
};

export default UserBar;
