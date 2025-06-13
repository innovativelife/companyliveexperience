//Css
import "./ReplyList.css";

//Components
import { useAppSelector } from "../../app/hooks";
import Reply from "../Reply/Reply";

//Data
import { ReplySelector } from "../../features/replies/repliesSlice";
import localData from "../../localData.json";

type ReplyListProps = {};

const ReplyList = ({}: ReplyListProps) => {
  // All post Data
  const replies = useAppSelector(ReplySelector).replies;

  return (
    <div className="replyList">
      <h2>Replies</h2>
      {replies.length === 0 ? (
        <>
          <img
            src={localData.speachBubble}
            className="speachBubble"
            alt="SpeachBubble"
            onError={(e) => {
              e.currentTarget.onerror = null; // Prevent infinite loop
              e.currentTarget.src = localData.ImageNotFound;
            }}
          />
          <h3>No replies yet</h3>
        </>
      ) : (
        replies.map((reply, index) => <Reply key={index} reply={reply} />) //Add a UID for each reply
      )}
    </div>
  );
};

export default ReplyList;
