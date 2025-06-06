//Css
import "./ActionItem.css";

type ActionItemProps = { icon: string; count: number };

const ActionItem = ({ icon, count }: ActionItemProps) => {
  return (
    <div className="actionItemContainer">
      <div className="actionItem">
        <svg className="actionIcon" fill="currentColor" viewBox="0 0 256 256">
          <path d={icon}></path>
        </svg>
      </div>
      <h3>{count}</h3>
    </div>
  );
};

export default ActionItem;
