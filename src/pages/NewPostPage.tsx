//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import UserBar from "../components/UserBar/UserBar";
import Padding from "../components/Padding/Padding";
import PostWriter from "../components/PostWriter/PostWriter";
import Spinner from "../components/Spinner/Spinner";

//Data
import { useGetEmployeeByIdQuery } from "../features/employees/employeeAPI";
import { svgs } from "../assets/svgs";
const userUID = import.meta.env.VITE_USER_UID;

const NewPostPage = () => {
  //Top bar data
  const iconPath = svgs.back;
  const topBarButtonLocation = "/home";

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
        buttonClickLocation={topBarButtonLocation}
      />

      <UserBar employee={user} descriptor="@AddTagToUsersInBackend" />

      {userIsFetching && <Spinner />}
      {userIsError && <p className="errorMessage">Error fetching user</p>}
      <PostWriter />
      <NavBar />
      <Padding />
    </>
  );
};

export default NewPostPage;
