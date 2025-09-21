type ActionItemProps = {
  svgIcon?: string;
  emojiIcon?: string;
  count: number;
  handleClick?: () => void;
};

const ActionItem = ({
  svgIcon,
  emojiIcon,
  count,
  handleClick,
}: ActionItemProps) => {
  return (
    <div
      className="flex items-center justify-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      {/* If svgIcon is provided, render it */}
      {svgIcon && (
        <svg className="w-6 h-6" viewBox="0 0 256 256">
          <path d={svgIcon} className="fill-secondary border-0"></path>
        </svg>
      )}

      {/* If emojiIcon is provided, render it */}
      {emojiIcon && <span>{emojiIcon}</span>}

      <h3>{count}</h3>
    </div>
  );
};

export default ActionItem;
