import React, { useState, useCallback, ChangeEvent, useEffect } from "react";
import type { FormEvent } from "react";
import { useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postSlice";

//Css
import "./MessageInput.css";

//Components

//Data
// import { selectTopBarColor } from "../../../features/uiConfig/uiSelectors";
import { createPost } from "../../features/posts/postSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

type MessageInputProps = {
  // channel: string;
  // setChannel: (channel: string) => void;
};

const MessageInput = ({}: // currentChannel,
// setCurrentChannel,
MessageInputProps) => {
  //Get imported data
  //   const topBarColor = useSelector(selectTopBarColor);
  const channels = ["all"];

  //Set css variables
  const root = document.documentElement;
  //   root.style.setProperty("--color-topBar", topBarColor);

  //Message Data
  const [message, setMessage] = useState("");

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    []
  );

  const dispatch = useAppDispatch();

  const sendMessage = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(`Sending ${message}`);
      dispatch(createPost(message)).then(() => {
        dispatch(fetchPosts());
        setMessage(""); // Reset here after dispatching
      });
    },
    [message, dispatch]
  );

  return (
    <>
      <div className="channels">
        {channels.map((channel) => (
          <button key={channel}>{channel}</button>
        ))}
      </div>
      <form className="messageInput" onSubmit={sendMessage}>
        <input
          type="text"
          className="input"
          placeholder="Write a Message"
          value={message}
          onChange={handleMessageChange}
        />
        <button type="submit">Send</button>
        {/* <select name="T" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select> */}
      </form>
    </>
  );
};

export default MessageInput;
