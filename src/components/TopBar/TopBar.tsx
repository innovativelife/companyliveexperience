import { useNavigate } from "react-router-dom";

//Css
import "./TopBar.css";

type TopBarProps = {
  title: string;
  icon: string;
  buttonClickLocation: string;
};

const TopBar = ({ title, icon, buttonClickLocation }: TopBarProps) => {
  let navigate = useNavigate();

  function handleClick() {
    navigate(buttonClickLocation);
  }

  return (
    <div className="topBar">
      <div
        onClick={handleClick}
        className="icon-container"
        data-icon="ArrowLeft"
        data-size="24px"
        data-weight="regular"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d={icon}></path>
        </svg>
      </div>
      <h1 className="title">{title}</h1>
    </div>
  );
};

export default TopBar;
