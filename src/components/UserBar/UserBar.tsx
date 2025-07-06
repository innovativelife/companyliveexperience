//Css
// import "./UserBar.css";

//Components
import Avatar from "../Avatar/Avatar";

//Data
import { Employee } from "../../features/employees/employeeTypes";

type UserBarProps = { employee?: Employee; descriptor: string };

const UserBar = ({ employee, descriptor }: UserBarProps) => {
  return (
    <div
      className="flex items-center gap-4 py-2 px-4 min-h-[72px]"
      data-oid="user-bar-container"
    >
      {/* <img className="avatar" src={sender?.avatarURL} /> */}
      <Avatar employee={employee} data-oid="user-bar-avatar" />

      <div className="flex flex-col justify-center" data-oid="user-bar-content">
        <p data-oid="user-bar-name">
          {employee?.firstName ?? "Unknown"} {employee?.lastName ?? "Unknown"}
        </p>
        <h3 data-oid="user-bar-descriptor">{descriptor}</h3>
      </div>
    </div>
  );
};

export default UserBar;
