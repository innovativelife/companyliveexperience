//Css
import "./UserBar.css";

//Components
import Avatar from "../Avatar/Avatar";

//Data
import { Employee } from "../../features/employees/employeeTypes";

type UserBarProps = { employee?: Employee; descriptor: string };

const UserBar = ({ employee, descriptor }: UserBarProps) => {
  return (
    <div className="postHeader">
      {/* <img className="avatar" src={sender?.avatarURL} /> */}
      <Avatar employee={employee} />

      <div className="userInfo">
        <p>
          {employee?.firstName ?? "Unknown"} {employee?.lastName ?? "Unknown"}
        </p>
        <h3>{descriptor}</h3>
      </div>
    </div>
  );
};

export default UserBar;
