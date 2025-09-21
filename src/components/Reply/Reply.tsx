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
  reactionFunction: (postId: string) => void;
};

const Reply = ({
  reply,
  employee,
  employeeLoading,
  reactionFunction,
}: ReplyProps) => {
  const time = timeAgo(reply.timeSent);

  return (
    <div className="flex w-full flex-row box-border items-start justify-star gap-3 p-4">
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
            svgIcon={svgs.addReaction}
            count={23}
            handleClick={() => reactionFunction(reply.postId)}
            //TODO: change from postId to replyId or whatever is needed
          />
        </div>
      </div>
    </div>
  );
};

export default Reply;
