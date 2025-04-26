import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

import SearchTopBar from "../components/TopBar/SearchTopBar";
import BottomBar from "../components/BottomBar/BottomBar";
import ContactList from "../components/Contacts/ContactList";
import { PageButton } from "../components/BottomBar/BottomBarButton";

import { useAppDispatch, useAppSelector } from "../app/hooks";

import {
  fetchEmployees,
  employeeSelector,
} from "../features/employees/employeeSlice";
import sampleData from "../temporaryData.json";
import {
  fetchUiConfigs,
  uiConfigSelector,
} from "../features/uiConfig/uiConfigSlice";

const Home = () => {
  //Search bar data
  const search = useCallback((term: string) => {
    console.log(`Searching ${term}`);
  }, []);

  //Page Data
  const pageButtons: PageButton[] = sampleData.pageButtons;
  const currentPage = useLocation().pathname.split("/").filter(Boolean)[0];

  const dispatch = useAppDispatch();

  //All employee Data
  const employees = useAppSelector(employeeSelector).employees;
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  //All graphic data
  const uiConfig = useAppSelector(uiConfigSelector).uiConfigs;
  useEffect(() => {
    dispatch(fetchUiConfigs());
  }, [dispatch]);

  // console.log(uiConfig);

  //Functions
  const onEmailUser = (person: string) => {
    console.log(`You are now emailing ${person}`);
  };
  const onPhoneUser = (person: string) => {
    console.log(`You are now phoning ${person}`);
  };
  const onFavourite = (person: string) => {
    console.log(`You are now favouriting ${person}`);
  };

  //Images
  const starIcon =
    "m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z";
  const emailIcon =
    "M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z";
  const phoneIcon =
    "M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z";

  return (
    <>
      <SearchTopBar
        searchBarInitialText={sampleData.searchBar.searchBarText}
        uiConfig={uiConfig}
        onSearch={search}
      />
      <ContactList
        people={employees}
        onFavourite={onFavourite}
        onEmailUser={onEmailUser}
        onPhoneUser={onPhoneUser}
        emailSrc={emailIcon}
        phoneSrc={phoneIcon}
        starSrc={starIcon}
        long={true}
      />

      <BottomBar pageButtons={pageButtons} currentPage={currentPage} />
    </>
  );
};

export default Home;
