import React, { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

//Css
import "./UserBar.css";

//Data
import {
  employeeSelector,
  fetchEmployee,
} from "../../features/employees/employeeSlice";

type UserBarProps = { userId: string; timeSent: string };

const UserBar = ({ userId, timeSent }: UserBarProps) => {
  //Get sender information
  const dispatch = useAppDispatch();
  const sender = useAppSelector(employeeSelector).singleEmployee;
  useEffect(() => {
    dispatch(fetchEmployee(userId));
  }, [dispatch]);

  //Get the timestamp
  const time = timeAgo(timeSent);

  return (
    <div className="post-header">
      <img
        className="avatar"
        // style={{
        //   backgroundImage: "url(" + sender?.avatarURL + ")",
        // }}
        src={sender?.avatarURL}
      />
      <div className="user-info">
        <p className="user-name">
          {sender?.firstName} {sender?.lastName}
        </p>
        <h3 className="additional-text">{time}</h3>
      </div>
    </div>
  );
};

function timeAgo(timestamp: string) {
  const now = new Date();
  const sent = new Date(timestamp);

  if (isNaN(sent.getTime())) {
    return "Invalid date";
  }

  const diffInSeconds = Math.floor((now.getTime() - sent.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}min`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d`;
}

export default UserBar;
