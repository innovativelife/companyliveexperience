//Components
import Reply from "../Reply/Reply";
import ReplyListSkeleton from "./ReplyListSkeleton";

//Data
// import { ReplySelector } from "../../features/replies/repliesSlice";
import { Reply as ReplyType } from "../../features/replies/repliesType";
import { Employee } from "../../features/employees/employeeTypes";
import { images } from "../../assets/images";

type ReplyListProps = {
  replies?: ReplyType[];
  replyLoading: boolean;
  employees?: Record<string, Employee>;
  employeeLoading: boolean;
};

const ReplyList = ({
  replies,
  replyLoading,
  employees,
  employeeLoading,
}: ReplyListProps) => {
  if (replyLoading || employeeLoading) {
    return <ReplyListSkeleton />;
  } else if (replies?.length === 0) {
    return (
      <div>
        <h2 className=" p-4">Replies</h2>
        <img
          src={images.speachBubble}
          className="ws-full p-4 box-border rounded-5"
          alt="SpeachBubble"
          onError={(e) => {
            e.currentTarget.onerror = null; // Prevent infinite loop
            e.currentTarget.src = images.ImageNotFound;
          }}
        />

        <h3 className="p-4 pt-0">No replies yet</h3>
      </div>
    );
  } else {
    return (
      <div>
        <h2 className=" p-4">Replies</h2>
        {Array.isArray(replies) &&
          replies.map((reply, index) => (
            <Reply
              key={index}
              reply={reply}
              replyLoading={replyLoading}
              employee={employees?.[reply.employeeUID]}
              employeeLoading={employeeLoading}
            />
          ))}
      </div>
    );
  }
};

export default ReplyList;
