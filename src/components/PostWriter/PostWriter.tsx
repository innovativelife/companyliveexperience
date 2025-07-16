// import "./LargeButton.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { uploadOptionsType } from "../ColoredSvgButtonList/ColoredSvgButtonList";

//Components
import LargeInputField from "../LargeInputField/LargeInputField";
import ColoredSvgButtonList from "../ColoredSvgButtonList/ColoredSvgButtonList";
import LargeButton from "../LargeButton/LargeButton";

//Data
import { useCreatePostMutation } from "../../features/posts/postAPI";
import { svgs } from "../../assets/svgs";

//Data Upload Options
const uploadOptions: uploadOptionsType[] = [
  {
    svg: svgs.photos,
    label: "Photo",
  },
  {
    svg: svgs.videos,
    label: "Video",
  },
];

const PostWriter = () => {
  //Navigation
  const navigate = useNavigate();

  //Posting Data
  const [postText, setPostText] = useState("");

  const [createPost, { isSuccess, isLoading, error }] = useCreatePostMutation();

  const sendMessage = async () => {
    try {
      await createPost(postText).unwrap(); // unwrap gives you the raw response or throws
      navigate("/home"); // Navigate on success
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <>
      <LargeInputField value={postText} onChange={setPostText} />

      <ColoredSvgButtonList uploadOptions={uploadOptions} />

      {isLoading && <p>Sending...</p>}
      {error && <p className="errorMessage">Error while creating post</p>}
      {isSuccess && <p>Message Sent</p>}
      <LargeButton onClick={sendMessage} label="Post" />
    </>
  );
};

export default PostWriter;
