import React, { useState, useCallback, ChangeEvent } from "react";
import { useParams } from "react-router-dom";

//Components
import Avatar from "../Avatar/Avatar";

//Data
type PostProps = { postId: string; employeeLoading: boolean };
import { svgs } from "../../assets/svgs";

import { useCreateReplyMutation } from "../../features/replies/repliesAPI";
import { useGetEmployeeByIdQuery } from "../../features/employees/employeeAPI";

const ReplyInput = ({ postId, employeeLoading }: PostProps) => {
  const userUID = import.meta.env.VITE_USER_UID;
  const { tenantId } = useParams<{ tenantId: string }>();

  const user = useGetEmployeeByIdQuery({
    tenantId: tenantId ?? "",
    employeeUID: userUID ?? "",
  }).data;

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
        await createReply({
          tenantId: tenantId ?? "",
          message,
          postId,
        }).unwrap(); // Unwrap to handle rejections properly
        setMessage(""); // Clear input
      } catch (err) {
        console.error("Failed to send reply:", err);
      }
    },
    [message, postId, tenantId, createReply]
  );
  return (
    <>
      {isLoading && <p data-oid="g3-xdi-">Sending...</p>}
      {error && (
        <p className="errorMessage" data-oid="ke._:vy">
          Error while creating reply
        </p>
      )}
      <div
        className="flex items-center py-3 px-4 gap-3 container inline-size"
        data-oid="qa3ilgz"
      >
        <Avatar
          employee={user}
          size="small"
          employeeLoading={employeeLoading}
          data-oid="s.q2zem"
        />

        <label
          className="flex flex-col min-w-40 flex-1 h-12"
          data-oid="p4oki:d"
        >
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
      </div>
    </>
  );
};

export default ReplyInput;
