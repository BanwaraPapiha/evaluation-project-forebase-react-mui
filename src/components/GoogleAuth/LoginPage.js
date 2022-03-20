import Login from "./Login";
import { signInWithGoogle } from "../../firebase-config/AuthGoogle";

function LoginPage() {
  return (
    <div>
      {/* <Login /> */}

      <div>

      <button onClick={ signInWithGoogle }>
        Sign in with Google
      </button>
    
    </div>   

    <h1>{localStorage.getItem("name")}</h1>
      <h1>{localStorage.getItem("email")}</h1>
      <img src={localStorage.getItem("profilePic")} />
    </div>
  );
}

export default LoginPage;
