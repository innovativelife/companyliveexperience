// import "./LargeButton.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { uploadOptionsType } from "../ColoredSvgButtonList/ColoredSvgButtonList";

//Components
import LargeInputField from "../LargeInputField/LargeInputField";
import ColoredSvgButtonList from "../ColoredSvgButtonList/ColoredSvgButtonList";
import LargeButton from "../LargeButton/LargeButton";
import Spinner from "../Spinner/Spinner";

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
  const handleGoBack = () => {
    navigate(-1);
  };

  //Get the tenantId and userUID
  const { tenantId } = useParams();
  const userUID = import.meta.env.VITE_USER_UID;
  //const { userUID } = useParams<{ userUID?: string }>();

  //Posting Data
  const [postText, setPostText] = useState("");

  const [createPost, { isLoading, error }] = useCreatePostMutation();

  const sendMessage = async () => {
    try {
      await createPost({
        tenantId: tenantId ?? "",
        userUid: userUID ?? "",
        message: postText,
      }).unwrap(); // unwrap gives you the raw response or throws
      handleGoBack(); // Navigate on success
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <>
      <LargeInputField value={postText} onChange={setPostText} />

      <ColoredSvgButtonList uploadOptions={uploadOptions} />

      {isLoading && <Spinner />}
      {error && <p className="errorMessage">Error while creating post</p>}

      <LargeButton onClick={sendMessage} label="Post" />
    </>
  );
};

export default PostWriter;
