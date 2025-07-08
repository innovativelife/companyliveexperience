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

  const refetchAll = async () => {
    await Promise.all([employeesRefetch(), postsRefetch()]);
  };

  return (
    <>
      <PullToRefresh
        onRefresh={() => refetchAll().then(() => {})}
        style={{ minHeight: "100vh" }}
        data-oid="vrmj79g"
      >
        <TopBar
          title={homeTitle}
          icon={iconPath}
          buttonClickLocation={topBarButtonLocation}
          data-oid="tt9kc3p"
        />

        {(postsIsFetching || employeesIsFetching) && (
          <Spinner data-oid="-dmueko" />
        )}
        <Banner bannerUrl={appBannerUrl} data-oid="2lx0xjk" />
        {postsIsError && (
          <p className="errorMessage" data-oid="nb_jthl">
            Error fetching posts
          </p>
        )}
        {employeesIsError && (
          <p className="errorMessage" data-oid="efbr:o:">
            Error fetching employees
          </p>
        )}
        <PostList posts={posts} employees={employeeMap} data-oid="vj:po-y" />

        <NavBar data-oid="xramyi5" />
        <Padding data-oid="lpnnmom" />
      </PullToRefresh>
    </>
  );
};

export default HomePage;
