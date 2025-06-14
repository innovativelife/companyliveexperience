// import "./LargeButton.css";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { uploadOptionsType } from "../ColoredSvgButtonList/ColoredSvgButtonList";
import { useAppDispatch } from "../../app/hooks";

//Components
import LargeInputField from "../LargeInputField/LargeInputField";
import ColoredSvgButtonList from "../ColoredSvgButtonList/ColoredSvgButtonList";
import LargeButton from "../LargeButton/LargeButton";

//Data
import { createPost } from "../../features/posts/postSlice";
import localData from "../../localData.json";

type PostWriterProps = {};

//Data Upload Options
const uploadOptions: uploadOptionsType[] = [
  {
    svg: localData.svgPaths.photos,
    label: "Photo",
  },
  {
    svg: localData.svgPaths.videos,
    label: "Video",
  },
];

const PostWriter = ({}: PostWriterProps) => {
  //Navigation
  let navigate = useNavigate();

  //Posting Data
  const [postText, setPostText] = useState("");

  const dispatch = useAppDispatch();

  const sendMessage = useCallback(() => {
    console.log(`Sending ${postText}`);
    dispatch(createPost(postText)).then(() => {
      navigate("/home");
    });
  }, [postText, dispatch]);

  return (
    <>
      <LargeInputField value={postText} onChange={setPostText} />
      <ColoredSvgButtonList uploadOptions={uploadOptions} />
      <LargeButton onClick={sendMessage} label="Post" />
    </>
  );
};

export default PostWriter;
