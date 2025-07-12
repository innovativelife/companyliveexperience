// import "./LargeButton.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
      const { tenantId } = useParams();

      await createPost({ tenantId: tenantId ?? "", message: postText }).unwrap(); // unwrap gives you the raw response or throws
      navigate("/home"); // Navigate on success
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  return (
    <>
      <LargeInputField
        value={postText}
        onChange={setPostText}
        data-oid="post-writer-input-field"
      />

      <ColoredSvgButtonList
        uploadOptions={uploadOptions}
        data-oid="post-writer-button-list"
      />

      {isLoading && <p data-oid="post-writer-loading-message">Sending...</p>}
      {error && (
        <p data-oid="post-writer-error-message">Error while creating post</p>
      )}
      {isSuccess && <p data-oid="post-writer-success-message">Message Sent</p>}
      <LargeButton
        onClick={sendMessage}
        label="Post"
        data-oid="post-writer-button"
      />
    </>
  );
};

export default PostWriter;
