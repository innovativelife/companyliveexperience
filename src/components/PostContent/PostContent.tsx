type PostProps = {
  message: string;
  imageURL: string;
  handleClick: () => void;
};

const PostContent = ({ message, imageURL, handleClick }: PostProps) => {
  //Check the messages contents
  const hasImage = Boolean(imageURL);
  const hasMessage = Boolean(message);

  return (
    <div onClick={handleClick}>
      {/* Message (conditionally rendered) */}
      {hasMessage && <p className="pt-1 pr-4 pb-3 pl-4">{message}</p>}

      {/* Image Block (conditionally rendered) */}
      {hasImage && (
        <div className="flex py-3 px-0">
          <img
            className="max-w-full h-auto block mx-auto my-6"
            src={imageURL}
            alt="Post content"
          />
        </div>
      )}
    </div>
  );
};

export default PostContent;
