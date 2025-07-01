import { timeAgo } from "../../hooks/timeAgo";
import { svgs } from "../../assets/svgs";

//Css
import "./Reply.css";

//Components
import Avatar from "../Avatar/Avatar";

import { Reply as ReplyType } from "../../features/replies/repliesType";
import { Employee } from "../../features/employees/employeeTypes";

type ReplyProps = { reply: ReplyType; employee?: Employee };

const Reply = ({ reply, employee }: ReplyProps) => {
  const time = timeAgo(reply.timeSent);

  return (
    <div className="commentContainer">
      <Avatar employee={employee} size="small" />
      <div className="commentContent">
        <div className="commentHeader">
          <p className="commentUsername">
            {employee?.firstName ?? "Unknown"} {employee?.lastName ?? "Unknown"}
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
                <path d={svgs.thumbsUp} />
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
