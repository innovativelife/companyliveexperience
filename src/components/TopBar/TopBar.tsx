// import { useNavigate } from "react-router-dom";

//Css
// import "./TopBar.css";

type TopBarProps = {
  title: string;
  icon: string;
  // buttonClickLocation: string;
  onClick: () => void;
};

const TopBar = ({ title, icon, onClick }: TopBarProps) => {
  // const navigate = useNavigate();

  // function handleClick() {
  //   navigate(buttonClickLocation);
  // }

  return (
    <div
      className="sticky top-0 flex justify-between items-center p-4 pb-2 bg-primary"
      data-oid="top-bar-container"
    >
      <div
        onClick={onClick}
        className="text-text flex h-12 w-12 items-center shrink-0"
        data-weight="regular"
        data-oid="top-bar-svg-container"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 256 256"
          data-oid="top-bar-svg"
        >
          <path
            d={icon}
            className="fill-text border-0"
            data-oid="top-bar-svg-path"
          ></path>
        </svg>
      </div>
      <h1
        className="text-text text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12"
        data-oid="top-bar-title"
      >
        {title}
      </h1>
    </div>
  );
};

export default TopBar;
