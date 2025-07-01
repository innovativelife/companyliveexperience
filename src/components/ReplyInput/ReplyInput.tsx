import React, { useState, useCallback, ChangeEvent } from "react";

//Components
import Avatar from "../Avatar/Avatar";

//Css
import "./ReplyInput.css";

//Data Types
type PostProps = { postId: string };

import { svgs } from "../../assets/svgs";
// import { useSelector } from "react-redux";
// import { RootState } from "../../app/store"; // import { useAppDispatch } from "../../app/hooks";

import { useCreateReplyMutation } from "../../features/replies/repliesAPI";
import { useGetEmployeeByIdQuery } from "../../features/employees/employeeAPI";

const ReplyInput = ({ postId }: PostProps) => {
  const userUID = import.meta.env.VITE_USER_UID;
  const user = useGetEmployeeByIdQuery(userUID).data;

  // const user = useSelector((state: RootState) => state.auth.user);
  //
  // let userUID = user?.uid;
  // if (!user?.uid) {
  //   // throw new Error("User UID is required but not available.");
  //   console.log("User UID is required but not available.");
  //   userUID = "d57c6f76-263b-4c1e-a199-f4593a897339";
  // } else {
  //   console.log("Working");
  // }

  const [message, setMessage] = useState("");

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const [createReply, { isLoading, error }] = useCreateReplyMutation();

  const sendMessage = useCallback(
    async (event: React.MouseEvent) => {
      event.preventDefault();
      console.log(`Sending ${message}`);
      try {
        await createReply({ message, postId }).unwrap(); // Unwrap to handle rejections properly
        setMessage(""); // Clear input
      } catch (err) {
        console.error("Failed to send reply:", err);
      }
    },
    [message, postId, createReply]
  );
  return (
    <div className="replyInputContainer">
      <Avatar employee={user} size="small" />
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
          <path d={svgs.paperPlane} />
        </svg>
      </div>
      {isLoading && (
        <div className="loading-message">
          <p>Sending...</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>Error while creating reply</p>
        </div>
      )}
    </div>
  );
};

export default ReplyInput;
