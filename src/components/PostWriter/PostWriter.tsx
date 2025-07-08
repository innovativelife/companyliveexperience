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
      <LargeInputField
        value={postText}
        onChange={setPostText}
        data-oid="tw:ji2u"
      />

      <ColoredSvgButtonList uploadOptions={uploadOptions} data-oid="jk202er" />

      {isLoading && <p data-oid="65sus59">Sending...</p>}
      {error && (
        <p className="errorMessage" data-oid="vag0:ao">
          Error while creating post
        </p>
      )}
      {isSuccess && <p data-oid="xm5x86x">Message Sent</p>}
      <LargeButton onClick={sendMessage} label="Post" data-oid="vnna-a." />
    </>
  );
};

export default PostWriter;
