import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

//Css
import "./UserBar.css";

//Components
import Avatar from "../Avatar/Avatar";

//Data
import {
  employeeSelector,
  fetchEmployee,
} from "../../features/employees/employeeSlice";

type UserBarProps = { userId: string; descriptor: string };

const UserBar = ({ userId, descriptor }: UserBarProps) => {
  //Get sender information
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEmployee(userId));
  }, [dispatch]);
  const sender = useAppSelector(employeeSelector).singleEmployee;

  return (
    <div className="postHeader">
      {/* <img className="avatar" src={sender?.avatarURL} /> */}
      <Avatar userId={userId} />

      <div className="userInfo">
        <p>
          {sender?.firstName} {sender?.lastName}
        </p>
        <h3>{descriptor}</h3>
      </div>
    </div>
  );
};

export default UserBar;
