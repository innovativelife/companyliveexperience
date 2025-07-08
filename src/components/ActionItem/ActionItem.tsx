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
      data-oid="3:0_7k9"
    >
      <svg className="w-6 h-6" viewBox="0 0 256 256" data-oid="fjh8c62">
        <path
          d={icon}
          className="fill-secondary border-0"
          data-oid="v7nwobv"
        ></path>
      </svg>
      <h3 data-oid="ze_-p83">{count}</h3>
    </div>
  );
};

export default ActionItem;
