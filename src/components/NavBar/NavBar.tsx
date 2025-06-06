import { useSelector } from "react-redux";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import localData from "../../localData.json";

//Css
import "./NavBar.css";

//Components
import NavItem from "../NavItem/NavItem";

//Data
import { selectPages } from "../../features/uiConfig/uiSelectors";

type TopBarProps = {};

const TopBar = ({}: TopBarProps) => {
  //Get imported data
  const { homeTitle, peopleTitle, calendarTitle, tribesTitle, moreTitle } =
    useSelector(selectPages);

  //Find current page
  const currentPage = useCurrentPage();

  //Set nav items
  const navItems = [
    {
      label: homeTitle,
      location: `/${homeTitle}`.toLowerCase(),
      icon: localData.svgPaths.home,
    },
    {
      label: peopleTitle,
      location: `/${peopleTitle}`.toLowerCase(),
      icon: localData.svgPaths.people,
    },
    {
      label: calendarTitle,
      location: `/${calendarTitle}`.toLowerCase(),
      icon: localData.svgPaths.calendar,
    },
    {
      label: tribesTitle,
      location: `/${tribesTitle}`.toLowerCase(),
      icon: localData.svgPaths.tribes,
    },
    {
      label: moreTitle,
      location: `/${moreTitle}`.toLowerCase(),
      icon: localData.svgPaths.more,
    },
  ];

  return (
    <div className="nav-container">
      <div className="nav-bar">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            label={item.label}
            iconPath={item.icon}
            location={item.location}
            active={item.label === currentPage ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default TopBar;
