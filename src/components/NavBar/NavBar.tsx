import { useSelector } from "react-redux";
import { useCurrentPage } from "../../hooks/useCurrentPage";
import { svgs } from "../../assets/svgs";

//Components
import NavItem from "../NavItem/NavItem";

//Data
import { selectPages } from "../../features/uiConfig/uiSelectors";

const NavBar = () => {
  //Get imported data
  const { homeTitle, peopleTitle, calendarTitle, tribesTitle, moreTitle } =
    useSelector(selectPages);

  //Find current page
  const currentPage = useCurrentPage();

  //Set nav items
  const navItems = [
    {
      label: homeTitle ?? "Home",
      location: `/${homeTitle}`.toLowerCase(),
      icon: svgs.home,
    },
    {
      label: peopleTitle ?? "People",
      location: `/${peopleTitle}`.toLowerCase(),
      icon: svgs.people,
    },
    {
      label: calendarTitle ?? "Calendar",
      location: `/${calendarTitle}`.toLowerCase(),
      icon: svgs.calendar,
    },
    {
      label: tribesTitle ?? "Tribes",
      location: `/${tribesTitle}`.toLowerCase(),
      icon: svgs.tribes,
    },
    {
      label: moreTitle ?? "More",
      location: `/${moreTitle}`.toLowerCase(),
      icon: svgs.more,
    },
  ];

  return (
    <div className="bg-tertiary w-full fixed box-border bottom-0 flex gap-2 border-t border-[#f3f0e7] px-4 pb-3 pt-2">
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
  );
};

export default NavBar;
