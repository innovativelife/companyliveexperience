//Css
import "./ActionItem.css";

type ActionItemProps = {
  icon: string;
  count: number;
  handleClick?: () => void;
};

const ActionItem = ({ icon, count, handleClick }: ActionItemProps) => {
  return (
    <div className="actionItem" onClick={handleClick}>
      <div className="actionIconContainer">
        <svg className="actionIcon" fill="currentColor" viewBox="0 0 256 256">
          <path d={icon}></path>
        </svg>
      </div>
      <h3>{count}</h3>
    </div>
  );
};

export default ActionItem;
