import app from '../../firebase-config/firebase-config';
import { Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../providers/userCtx";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const useStyles = makeStyles({
  root: {
    // background: "white",
    minWidth: "100%",
    minHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  logincard: {
    background: "linear-gradient(45deg, #9013FE 15%, #50E3C2 90%)",
    display: "flex",
    maxWidth: "100%",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
  },
});

function LoginPage() {
  const classes = useStyles();
  const UserCtx = useContext(UserContext)
  const user = auth.currentUser;
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        // const user = result.user;
        UserCtx.setLogUser(result.user)
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  
  const LogoutGoogle = () => {
    signOut(auth).then(() => {
      console.log("Sign Out Successful")
      // Sign-out successful.
    }).catch((error) => {
        console.log(error)
      // An error happened.
    });
  }

  return (
    <div className={classes.root}>
    <Grid className={classes.root} spacing={1} alignItems="center" justify="center">
      <Grid item xs={12} md={8}>
            {
              user?
              <div>
                <div>
                  <Button variant="contained" startIcon={<LogoutIcon />} onClick={ LogoutGoogle }>
                    Sign Out
                  </Button>
                </div>
                <div>
                  {UserCtx.Loguser.displayName}
                </div>
                <div>
                  {UserCtx.Loguser.email}
                </div>
                <div>
                  <img src={UserCtx.Loguser.photoURL} alt="Profile Photo"/>
                </div>

              </div> :
              <Button variant="contained" startIcon={<GoogleIcon />} onClick={ signInWithGoogle }>
                Sign in with Google
              </Button>

            }
      </Grid>

    </Grid>
    </div>

  );
}

export default LoginPage;
