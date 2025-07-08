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
    <div
      className="flex items-center py-3 px-4 gap-3 container inline-size"
      data-oid="qa3ilgz"
    >
      <Avatar employee={user} size="small" data-oid="s.q2zem" />
      <label className="flex flex-col min-w-40 flex-1 h-12" data-oid="p4oki:d">
        <input
          placeholder="Add a reply..."
          className="min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-none outline-none bg-inputs text-text px-4 h-full text-base font-normal leading-normal placeholder:text-secondary w-full"
          value={message}
          onChange={handleMessageChange}
          data-oid="u7wq49d"
        />
      </label>
      <div onClick={sendMessage} data-oid="kzx5x8w">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 256 256"
          type="submit"
          data-oid="-1va.rt"
        >
          <path
            d={svgs.paperPlane}
            className="fill-text border-0"
            data-oid="_0c1vvh"
          />
        </svg>
      </div>
      {isLoading && <p data-oid="g3-xdi-">Sending...</p>}
      {error && (
        <p className="errorMessage" data-oid="ke._:vy">
          Error while creating reply
        </p>
      )}
    </div>
  );
};

export default ReplyInput;
