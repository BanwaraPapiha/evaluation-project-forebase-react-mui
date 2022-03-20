import { signInWithGoogle } from "../../firebase-config/AuthGoogle";

function Login() {
  return (
    <div>
      <button onClick={ signInWithGoogle }>
        Sign in with Google
      </button>
      <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} />
    </div>
  );
}

export default Login;
