import { useMemo } from "react";
import { useSelector } from "react-redux";
import PullToRefresh from "react-pull-to-refresh";

//Components
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import PostList from "../components/PostList/PostList";
import Banner from "../components/Banner/Banner";
import Padding from "../components/Padding/Padding";
import Spinner from "../components/Spinner/Spinner";

//Data
import { selectPages } from "../features/uiConfig/uiSelectors";
import { images } from "../assets/images";
import { svgs } from "../assets/svgs";
import { useGetPostsQuery } from "../features/posts/postAPI";
import { useGetEmployeesQuery } from "../features/employees/employeeAPI";
import { selectAppBannerUrl } from "../features/uiConfig/uiSelectors";

const HomePage = () => {
  //Top bar data
  const homeTitle = useSelector(selectPages).homeTitle ?? "Home";
  const iconPath = svgs.plus;
  const topBarButtonLocation = "/home/newpost";
  const appBannerUrl =
    useSelector(selectAppBannerUrl).appBannerUrl ?? images.ImageNotFound;

  //All post Data
  const {
    data: posts,
    isLoading: postsIsLoading,
    isFetching: postsIsFetching,
    isError: postsIsError,
    refetch: postsRefetch,
  } = useGetPostsQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: employees,
    isLoading: employeesIsLoading,
    isFetching: employeesIsFetching,
    isError: employeesIsError,
    refetch: employeesRefetch,
  } = useGetEmployeesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const employeeMap = useMemo(() => {
    return Object.fromEntries(
      (employees ?? []).map((employee) => [employee.employeeUID, employee])
    );
  }, [employees]);

  // Determine if initial load is happening for skeletons
  // const isInitialLoading = postsIsLoading || employeesIsLoading;
  // console.log(isInitialLoading);

  // Determine if background fetching is happening for spinner
  const isBackgroundFetching =
    (postsIsFetching && !postsIsLoading) ||
    (employeesIsFetching && !employeesIsLoading);

  const refetchAll = async () => {
    await Promise.all([employeesRefetch(), postsRefetch()]);
  };

  return (
    <>
      <PullToRefresh
        onRefresh={() => refetchAll().then(() => {})}
        style={{ minHeight: "100vh" }}
      >
        <TopBar
          title={homeTitle}
          icon={iconPath}
          buttonClickLocation={topBarButtonLocation}
        />

        {/* Apply Spinner for background  reload*/}
        {isBackgroundFetching && <Spinner />}

        <Banner
          bannerUrl={appBannerUrl}
          fallbackImageUrl={images.ImageNotFound}
        />

        {/* Show error messages if their are problems fetching posts or employees*/}
        {postsIsError && <p className="errorMessage">Error fetching posts</p>}
        {employeesIsError && (
          <p className="errorMessage">Error fetching employees</p>
        )}

        <PostList
          posts={posts}
          postLoading={postsIsLoading}
          employees={employeeMap}
          employeeLoading={employeesIsLoading}
        />

        <NavBar />
        <Padding />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
