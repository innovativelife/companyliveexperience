import { useNavigate } from "react-router-dom";

//Css
import "./NavItem.css";

type TopBarProps = {
  label: string;
  iconPath: string;
  active: boolean;
  location: string;
};

const TopBar = ({ label, iconPath, active, location }: TopBarProps) => {
  //Navigation
  const navigate = useNavigate();

  function handleClick() {
    navigate(location);
  }

  //Determine color
  const itemClass = `navItem ${active ? "active" : ""}`;

  return (
    <div className={itemClass} onClick={handleClick}>
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d={iconPath} />
        </svg>
      </div>
      <h3 className={itemClass}>{label}</h3>
    </div>
  );
};

export default TopBar;
