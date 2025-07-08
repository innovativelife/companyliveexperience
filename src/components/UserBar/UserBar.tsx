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
      data-oid="5q7gbzp"
    >
      {/* <img className="avatar" src={sender?.avatarURL} /> */}
      <Avatar employee={employee} data-oid="yrvne0w" />

      <div className="flex flex-col justify-center" data-oid="llbp47q">
        <p data-oid="oq:n:o1">
          {employee?.firstName ?? "Unknown"} {employee?.lastName ?? "Unknown"}
        </p>
        <h3 data-oid="z6i0v:j">{descriptor}</h3>
      </div>
    </div>
  );
};

export default UserBar;
