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
    [onHandleClick],
  );

  return (
    <div
      className="display-flex items-center justify-center h-8"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        viewBox="0 0 256 256"
      >
        <path d={imgSrc} className="fill-text border-0" />
      </svg>
    </div>
  );
};

export default SvgButton;
