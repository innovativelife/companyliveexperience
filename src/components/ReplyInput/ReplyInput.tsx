import React, { useState, useCallback, ChangeEvent } from "react";

//Components
import Avatar from "../Avatar/Avatar";

//Css
import "./ReplyInput.css";

//Data Types
type PostProps = { postId: string };
import localData from "../../localData.json";
import { useAppDispatch } from "../../app/hooks";

import { fetchReplies, createReply } from "../../features/replies/repliesSlice";

const ReplyInput = ({ postId }: PostProps) => {
  const [message, setMessage] = useState("");

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const dispatch = useAppDispatch();

  const sendMessage = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      console.log(`Sending ${message}`);
      dispatch(createReply({ messageString: message, postId: postId })).then(
        () => {
          dispatch(fetchReplies(postId));
          setMessage(""); // Reset here after dispatching
        }
      );
    },
    [message, dispatch]
  );

  return (
    <div className="replyInputContainer">
      <Avatar userId={localData.userUID} size="small" />
      <label className="inputLabel">
        <input
          placeholder="Add a reply..."
          className="replyInput"
          value={message}
          onChange={handleMessageChange}
        />
      </label>
      <div className={"svgButton"} onClick={sendMessage}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
          type="submit"
        >
          <path d={localData.svgPaths.paperPlane} />
        </svg>
      </div>
    </div>
  );
};

export default ReplyInput;
