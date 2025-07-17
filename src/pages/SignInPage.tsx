import TopBar from "../components/TopBar/TopBar";
import AuthPage from "../components/AuthBox/authPage"; // Import the component
import Bannar from "../components/Banner/Banner";
import { images } from "../assets/images";
import { svgs } from "../assets/svgs";
function SignInPage() {
  const needToFix = () => {};

  return (
    <div className="SignIn" data-oid="r_u3voe">
      <TopBar
        title="Sign In"
        icon={svgs.back}
        onClick={needToFix}
        data-oid="r..q6k:"
      />
      <Bannar
        bannerUrl={images.loginBanner}
        fallbackImageUrl={images.ImageNotFound}
        data-oid="mk-aged"
      />
      <main data-oid="f_m5vgt">
        <AuthPage data-oid="vlp7dy-" />
      </main>
    </div>
  );
}

export default SignInPage;
