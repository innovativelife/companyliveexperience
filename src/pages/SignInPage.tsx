import TopBar from "../components/TopBar/TopBar";
import AuthPage from "../components/AuthBox/authPage"; // Import the component
import Bannar from "../components/Banner/Banner";
import { images } from "../assets/images";
import { svgs } from "../assets/svgs";
function SignInPage() {
  return (
    <div className="SignIn">
      <TopBar title="Sign In" icon={svgs.back} buttonClickLocation="/" />
      <Bannar bannerUrl={images.loginBanner} />
      <main>
        <AuthPage />
      </main>
    </div>
  );
}

export default SignInPage;
