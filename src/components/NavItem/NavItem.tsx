import { useNavigate } from "react-router-dom";

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

  function handleClick() {
    navigate(location);
  }

  //Determine color
  // const itemClass = `navItem ${active ? "active" : ""}`;
  // ${active ? "rounded-full text-text" : "text-secondary"}

  return (
    <div
      className={`flex flex-col items-center justify-end gap-1 flex-1 `}
      onClick={handleClick}
      data-oid="y75sb2."
    >
      <div
        className={"flex items-center justify-center h-8"}
        data-oid="kv:rcqp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 256 256"
          data-oid="s2g9a3e"
        >
          <path
            d={iconPath}
            className={`border-0 ${active ? "fill-text" : "fill-secondary"}`}
            data-oid="ysxx0wk"
          />
        </svg>
      </div>
      <h3
        className={`font-medium leading-none tracking-[0.015em] ${
          active ? "text-text" : "text-secondary"
        }`}
        data-oid="a-_oaeu"
      >
        {label}
      </h3>
    </div>
  );
};

export default TopBar;
