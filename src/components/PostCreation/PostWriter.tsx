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
// type PostWriterProps = {};

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
  //{}: PostWriterProps
  //Navigation
  const navigate = useNavigate();

  //Posting Data
  const [postText, setPostText] = useState("");

  const [createPost, { isSuccess, isLoading, error }] = useCreatePostMutation();

  // const dispatch = useAppDispatch();

  // const sendMessage = useCallback(() => {
  //   console.log(`Sending ${postText}`);
  //   dispatch(useCreatePostMutation(postText)).then(() => {
  //     navigate("/home");
  //   });
  // }, [postText, dispatch]);

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
      {isLoading && (
        <div className="loading-message">
          <p>Sending...</p>
        </div>
      )}
      {error && (
        <div className="error-message">
          <p>Error while creating post</p>
        </div>
      )}
      {isSuccess && (
        <div className="success-message">
          <p>Message Sent</p>
        </div>
      )}
      <LargeButton onClick={sendMessage} label="Post" />
    </>
  );
};

export default PostWriter;
