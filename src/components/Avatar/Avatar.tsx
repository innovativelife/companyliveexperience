import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

//Css
import "./Avatar.css";

//Data
import {
  employeeSelector,
  fetchEmployee,
} from "../../features/employees/employeeSlice";

type UserBarProps = { userId: string; size?: string };

const UserBar = ({ userId, size = "large" }: UserBarProps) => {
  //Get sender information
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEmployee(userId));
  }, [dispatch]);

  const sender = useAppSelector(employeeSelector).singleEmployee;

  const [imageError, setImageError] = useState(false);

  const initials = sender
    ? `${sender.firstName.charAt(0)} ${sender.lastName.charAt(0)}`.toUpperCase()
    : "";

  if (!sender || !sender.avatarURL || imageError) {
    return <div className={`avatarTxt ${size ?? "large"}`}>{initials}</div>;
  }

  return (
    <img
      src={sender.avatarURL}
      alt={`${sender.firstName} ${sender.lastName}`}
      className={`avatarImg ${size ?? "large"}`}
      onError={() => setImageError(true)}
    />
  );
};

export default UserBar;
