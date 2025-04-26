import React, { useCallback } from "react";

type SvgButtonProps = {
  onHandleClick: (user: string) => void;
  imgSrc: string;
  user: string;
  styleType: string;
};

const SvgButton = ({
  onHandleClick,
  imgSrc,
  user,
  styleType,
}: SvgButtonProps) => {
  const handleClick = useCallback(() => {
    onHandleClick(user);
  }, [onHandleClick, user]);

  return (
    <div className={"svgButton " + styleType} onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="black"
      >
        <path d={imgSrc} />
      </svg>
    </div>
  );
};

export default SvgButton;
