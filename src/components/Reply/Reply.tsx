import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React, { useCallback, useEffect } from "react";
import { timeAgo } from "../../hooks/timeAgo";
import localData from "../../localData.json";

//Css
import "./Reply.css";

//Components
import Avatar from "../Avatar/Avatar";

import {
  employeeSelector,
  fetchEmployee,
} from "../../features/employees/employeeSlice";

import { Reply as ReplyType } from "../../features/replies/repliesSlice";

//Data Types
// import { Post as PostType } from "../../features/posts/postSlice";
// export interface ReplyType {
//   // replyId: string;
//   timeSent: string;
//   employeeUID: string;
//   message: string;
//   // likes: number;
// }

type ReplyProps = { reply: ReplyType };

const Reply = ({ reply }: ReplyProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchEmployee(reply.employeeUID));
  }, [dispatch]);
  const sender = useAppSelector(employeeSelector).singleEmployee;

  const time = timeAgo(reply.timeSent);

  return (
    <div className="commentContainer">
      <Avatar userId={reply.employeeUID} size="small" />
      <div className="commentContent">
        <div className="commentHeader">
          <p className="commentUsername">
            {sender?.firstName} {sender?.lastName}
          </p>
          <h3>{time}</h3>
        </div>
        <p>{reply.message}</p>
        <div className="commentActions">
          <div className="commentReactGroup">
            <div className="commentReactIcon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d={localData.svgPaths.thumbsUp} />
              </svg>
            </div>
            <h3>3</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
