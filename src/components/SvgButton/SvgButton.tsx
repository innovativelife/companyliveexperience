import React, { useCallback, FormEvent } from "react";

type SvgButtonProps = {
  onHandleClick: (event: FormEvent) => void;
  imgSrc: string;
  user: string;
  styleType: string;
};

const SvgButton = ({ onHandleClick, imgSrc }: SvgButtonProps) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      onHandleClick(event);
    },
    [onHandleClick]
  );

  return (
    <div className={"svgButton"} onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 256 256"
      >
        <path d={imgSrc} />
      </svg>
    </div>
  );
};

export default SvgButton;
