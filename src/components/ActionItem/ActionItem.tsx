type ActionItemProps = {
  icon: string;
  count: number;
  handleClick?: () => void;
};

const ActionItem = ({ icon, count, handleClick }: ActionItemProps) => {
  return (
    <div
      className="flex items-center justify-center gap-2 cursor-pointer"
      onClick={handleClick}
    >
      <svg className="w-6 h-6" viewBox="0 0 256 256">
        <path d={icon} className="fill-secondary border-0"></path>
      </svg>
      <h3>{count}</h3>
    </div>
  );
};

export default ActionItem;
