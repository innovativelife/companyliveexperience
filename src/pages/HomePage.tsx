import { useMemo } from "react";
import { useSelector } from "react-redux";
import PullToRefresh from "react-pull-to-refresh";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('newpost')
  };

  const appBannerUrl =
    useSelector(selectAppBannerUrl).appBannerUrl ?? images.ImageNotFound;

  //All post Data
  const {
    data: posts,
    isFetching: postsIsFetching,
    isError: postsIsError,
    refetch: postsRefetch,
  } = useGetPostsQuery(undefined, {
    pollingInterval: 30000000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: employees,
    isFetching: employeesIsFetching,
    isError: employeesIsError,
    refetch: employeesRefetch,
  } = useGetEmployeesQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const employeeMap = useMemo(() => {
    return Object.fromEntries(
      (employees ?? []).map((employee) => [employee.employeeUID, employee]),
    );
  }, [employees]);

  const refetchAll = async () => {
    await Promise.all([employeesRefetch(), postsRefetch()]);
  };

  return (
    <>
      <PullToRefresh
        onRefresh={() => refetchAll().then(() => {})}
        style={{ minHeight: "100vh" }}
        data-oid="home-page-refresh-container"
      >
        <TopBar
          title={homeTitle}
          icon={iconPath}
          onClick={handleNavigation}
          data-oid="home-page-top-bar"
        />

        {(postsIsFetching || employeesIsFetching) && (
          <Spinner data-oid="home-page-spinner" />
        )}
        <Banner bannerUrl={appBannerUrl} data-oid="home-page-banner" />
        {postsIsError && (
          <p data-oid="home-page-error-message-post">Error fetching posts</p>
        )}
        {employeesIsError && (
          <p data-oid="home-page-error-message-employee">
            Error fetching employees
          </p>
        )}
        <PostList
          posts={posts}
          employees={employeeMap}
          data-oid="home-page-post-list"
        />

        <NavBar data-oid="home-page-nav-bar" />
        <Padding data-oid="home-page-padding" />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
