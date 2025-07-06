//Css
// import "./ActionItem.css";

type ActionItemProps = {
  icon: string;
  count: number;
  handleClick?: () => void;
};

const ActionItem = ({ icon, count, handleClick }: ActionItemProps) => {
  return (
    // p-[4px] pl-[16px] pr-[16px] pb-[16px] pt-[4px]
    <div
      className="flex items-center justify-center gap-2 cursor-pointer"
      onClick={handleClick}
      data-oid="action-item-container"
    >
      <svg className="w-6 h-6" viewBox="0 0 256 256" data-oid="action-item-svg">
        <path
          d={icon}
          className="fill-secondary border-0"
          data-oid="action-item-svg-path"
        ></path>
      </svg>
      <h3 data-oid="action-item-count">{count}</h3>
    </div>
  );
};

export default ActionItem;
