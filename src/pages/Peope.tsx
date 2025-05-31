import React, { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";

//Components
import SearchTopBar from "../components/TopBar/SearchTopBar/SearchTopBar";
import BottomBar from "../components/BottomBar/BottomBar";
import ContactList from "../components/Contacts/ContactList";
import { useAppDispatch, useAppSelector } from "../app/hooks";

//Data
import {
  fetchEmployees,
  employeeSelector,
} from "../features/employees/employeeSlice";
import { fetchUiConfigs } from "../features/uiConfig/uiConfigSlice";

const Home = () => {
  //Search bar data
  const search = useCallback((term: string) => {
    console.log(`Searching ${term}`);
  }, []);

  //Page Data
  const currentPage = useLocation().pathname.split("/").filter(Boolean)[0];

  const dispatch = useAppDispatch();

  //All employee Data
  const employees = useAppSelector(employeeSelector).employees;
  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  //All graphic data
  useEffect(() => {
    dispatch(fetchUiConfigs());
  }, [dispatch]);

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

  return (
    <>
      <SearchTopBar onSearch={search} />
      <ContactList
        people={employees}
        onFavourite={onFavourite}
        onEmailUser={onEmailUser}
        onPhoneUser={onPhoneUser}
        long={true}
      />

      <BottomBar currentPage={currentPage} showMessageBar={false} />
    </>
  );
};

export default Home;
