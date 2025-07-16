import { useNavigate } from "react-router-dom";

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

  return (
    <div
      className={`flex flex-col items-center justify-end gap-1 flex-1 `}
      onClick={handleClick}
    >
      <div className={"flex items-center justify-center h-8"}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 256 256"
        >
          <path
            d={iconPath}
            className={`border-0 ${active ? "fill-text" : "fill-secondary"}`}
          />
        </svg>
      </div>
      <h3
        className={`font-medium leading-none tracking-[0.015em] ${
          active ? "text-text" : "text-secondary"
        }`}
      >
        {label}
      </h3>
    </div>
  );
};

export default TopBar;
