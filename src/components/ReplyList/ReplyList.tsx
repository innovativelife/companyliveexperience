//Css
// import "./ReplyList.css";

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
  return (
    <div data-oid="reply-list-container">
      <h2 className=" p-4" data-oid="reply-list-title">
        Replies
      </h2>
      {replies?.length === 0 ? (
        <>
          <img
            src={images.speachBubble}
            className="ws-full p-4 box-border rounded-5"
            alt="SpeachBubble"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = images.ImageNotFound;
            }}
            data-oid="reply-list-no-replies-image"
          />

          <h3 className="p-4 pt-0" data-oid="reply-list-no-replies-title">
            No replies yet
          </h3>
        </>
      ) : (
        Array.isArray(replies) &&
        replies.map((reply, index) => (
          <Reply
            key={index}
            reply={reply}
            employee={employees?.[reply.employeeUID]}
            data-oid="reply-list-reply"
          />
        ))
      )}
    </div>
  );
};

export default ReplyList;
