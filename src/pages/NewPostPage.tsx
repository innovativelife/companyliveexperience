//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import UserBar from "../components/UserBar/UserBar";
import Padding from "../components/Padding/Padding";
import PostWriter from "../components/PostWriter/PostWriter";
import Spinner from "../components/Spinner/Spinner";

import { useNavigate } from 'react-router-dom';

//Data
import { useGetEmployeeByIdQuery } from "../features/employees/employeeAPI";
import { svgs } from "../assets/svgs";
const userUID = import.meta.env.VITE_USER_UID;

const NewPostPage = () => {
  //Top bar data
  const iconPath = svgs.back;

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1); // This is the recommended way to go back!
  };

  //Chanel data
  const {
    data: user,
    isFetching: userIsFetching,
    isError: userIsError,
  } = useGetEmployeeByIdQuery(userUID ?? "");

  return (
    <>
      <TopBar
        title="New Post"
        icon={iconPath}
        onClick={handleGoBack}
        data-oid="new-post-top-bar"
      />

      <UserBar
        employee={user}
        descriptor="@AddTagToUsersInBackend"
        data-oid="new-post-user-bar"
      />

      {userIsFetching && <Spinner data-oid="new-post-spinner" />}
      {userIsError && <p data-oid="new-post-error">Error fetching user</p>}
      <PostWriter data-oid="new-post-post-writer" />
      <NavBar data-oid="new-post-nav-bar" />
      <Padding data-oid="new-post-padding" />
    </>
  );
};

export default NewPostPage;
