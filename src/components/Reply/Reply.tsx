import { timeAgo } from "../../hooks/timeAgo";
import { svgs } from "../../assets/svgs";

//Components
import Avatar from "../Avatar/Avatar";
import ActionItem from "../ActionItem/ActionItem";
import ReplyInfo from "../ReplyInfo/ReplyInfo";

import { Reply as ReplyType } from "../../features/replies/repliesType";
import { Employee } from "../../features/employees/employeeTypes";

type ReplyProps = {
  reply: ReplyType;
  replyLoading: boolean;
  employee?: Employee;
  employeeLoading: boolean;
};

const Reply = ({ reply, employee, employeeLoading }: ReplyProps) => {
  const time = timeAgo(reply.timeSent);

  function likeFunction() {
    console.log("You liked a post");
  }

  return (
    <div className="flex w-full flex-row box-border flex-row items-start justify-star gap-3 p-4">
      <Avatar
        employee={employee}
        size="small"
        employeeLoading={employeeLoading}
      />

      <div>
        {/* User name and time sent */}
        <ReplyInfo employee={employee} time={time} />

        {/* message */}
        <p>{reply.message}</p>

        <div className="flex w-full flex-row items-center justify-start gap-9 pt-2">
          <ActionItem
            icon={svgs.addReaction}
            count={23}
            handleClick={likeFunction}
          />
        </div>
      </div>
    </div>
  );
};

export default Reply;
