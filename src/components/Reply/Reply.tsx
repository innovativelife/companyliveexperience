import { timeAgo } from "../../hooks/timeAgo";
import { svgs } from "../../assets/svgs";

//Css
// import "./Reply.css";

//Components
import Avatar from "../Avatar/Avatar";
import ActionItem from "../ActionItem/ActionItem";

import { Reply as ReplyType } from "../../features/replies/repliesType";
import { Employee } from "../../features/employees/employeeTypes";

type ReplyProps = { reply: ReplyType; employee?: Employee };

const Reply = ({ reply, employee }: ReplyProps) => {
  const time = timeAgo(reply.timeSent);

  function likeFunction() {
    console.log("You liked a post");
  }

  return (
    <div
      className="flex w-full flex-row box-border flex-row items-start justify-star gap-3 p-4"
      data-oid="reply-container"
    >
      <Avatar employee={employee} size="small" data-oid="reply-avatar" />
      <div data-oid="reply-content">
        {/* User name and time sent */}
        <div
          className="flex w-full flex-row items-start justify-start gap-x-3"
          data-oid="reply-user-time-container"
        >
          <p className="font-bold leading-none" data-oid="reply-user">
            {employee?.firstName ?? "Unknown"} {employee?.lastName ?? "Unknown"}
          </p>
          <h3 data-oid="reply-time" className="p-0">
            {time}
          </h3>
        </div>
        {/* message */}
        <p data-oid="reply-message">{reply.message}</p>
        <div
          className="flex w-full flex-row items-center justify-start gap-9 pt-2"
          data-oid="reply-actions-container"
        >
          <ActionItem
            icon={svgs.addReaction}
            count={23}
            handleClick={likeFunction}
            data-oid="reply-reaction"
          />
        </div>
      </div>
    </div>
  );
};

export default Reply;
