//Css
import "./ReplyList.css";

//Components
// import { useAppSelector } from "../../app/hooks";
import Reply from "../Reply/Reply";

//Data
// import { ReplySelector } from "../../features/replies/repliesSlice";
import { Reply as ReplyType } from "../../features/replies/repliesType";
import { Employee } from "../../features/employees/employeeTypes";
import { images } from "../../assets/images";

type ReplyListProps = {
  replies?: ReplyType[];
  employees?: Record<string, Employee>;
};

const ReplyList = ({ replies, employees }: ReplyListProps) => {
  // All post Data

  return (
    <div className="replyList">
      <h2>Replies</h2>
      {replies?.length === 0 ? (
        <>
          <img
            src={images.speachBubble}
            className="speachBubble"
            alt="SpeachBubble"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = images.ImageNotFound;
            }}
          />
          <h3>No replies yet</h3>
        </>
      ) : (
        Array.isArray(replies) &&
        replies.map((reply, index) => (
          <Reply
            key={index}
            reply={reply}
            employee={employees?.[reply.employeeUID]}
          />
        )) //Add a UID for each reply
      )}
    </div>
  );
};

export default ReplyList;
