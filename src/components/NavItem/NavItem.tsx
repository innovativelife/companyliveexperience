import { useNavigate, useResolvedPath } from "react-router-dom";

//Css
// import "./NavItem.css";

type TopBarProps = {
  label: string;
  iconPath: string;
  active: boolean;
  location: string;
};

const TopBar = ({ label, iconPath, active, location }: TopBarProps) => {
  //Navigation
  const navigate = useNavigate();
  const toPath = "../"+ location;
  const resolved = useResolvedPath(toPath);

  function handleClick() {
    navigate(resolved);
  }

  //Determine color
  // const itemClass = `navItem ${active ? "active" : ""}`;
  // ${active ? "rounded-full text-text" : "text-secondary"}

  return (
    <div
      className={`flex flex-col items-center justify-end gap-1 flex-1 `}
      onClick={handleClick}
      data-oid="nav-item-container"
    >
      <div
        className={"flex items-center justify-center h-8"}
        data-oid="nav-item-svg-container"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 256 256"
          data-oid="nav-item-svg"
        >
          <path
            d={iconPath}
            className={`border-0 ${active ? "fill-text" : "fill-secondary"}`}
            data-oid="nav-item-svg-path"
          />
        </svg>
      </div>
      <h3
        className={`font-medium leading-none tracking-[0.015em] ${
          active ? "text-text" : "text-secondary"
        }`}
        data-oid="nav-item-label"
      >
        {label}
      </h3>
    </div>
  );
};

export default TopBar;
