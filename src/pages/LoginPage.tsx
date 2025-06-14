import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { googleLogout } from "@react-oauth/google"; // Import for logout
import { GoogleCredentialResponse } from "@react-oauth/google";

const LoginPage = () => {
  const clientId =
    "1051288677497-1rqgtld0gnjgvuc8m9vi3j4m3hemn56f.apps.googleusercontent.com";

  const onSuccess = (credentialResponse: GoogleCredentialResponse) => {
    console.log(credentialResponse);
    // Handle successful login (e.g., store user data, redirect)
  };

  const onError = () => {
    console.log("Login Failed");
  };

  const handleLogout = () => {
    googleLogout();
    // Handle logout (e.g., clear user data, redirect)
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin
        onSuccess={onSuccess}
        onError={onError}
        // Add other props like size, shape, theme as needed
      />
      <button onClick={handleLogout}>Logout</button>
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
