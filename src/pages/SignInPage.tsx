import AuthPage from '../features/auth/authPage'; // Import the component

function SignInPage() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Firebase Auth App</h1>
      </header>
      <main>
        <AuthPage />
      </main>
    </div>
  );
}

export default SignInPage;
