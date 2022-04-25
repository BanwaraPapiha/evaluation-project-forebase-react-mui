import app from '../../firebase-config/firebase-config';
import { Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../providers/userCtx";
import { Db } from "../../firebase-config/db";
import { collection, query, where, getDocs } from "firebase/firestore";

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

const auth = getAuth();
const provider = new GoogleAuthProvider();

function LoginPage() {
  const classes = useStyles();
  const UserCtx = useContext(UserContext)
  const user = auth.currentUser;
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        UserCtx.setLogUser(result.user)
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
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

  useEffect(()=>{
    const getAdmins = async () => {
      const Ref = collection(Db, "Admins");
      const q = query(Ref, where("role", "==", "admin"));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        if (doc.data().email === UserCtx.Loguser.email) {
          console.log("You are admin")
        } else if (!doc.data().email === UserCtx.Loguser.email) {
          console.log("You are not admin")
        }
      });
    }
    getAdmins()
  })

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      UserCtx.setLogUser(user)
    } else {
      // User is signed out
      UserCtx.setLogUser(null)
    }
  });
  
  return (
    <div className={classes.root}>
    <Grid className={classes.root} spacing={1} alignItems="center" justify="center">
      <Grid item xs={12} md={8}>
        {
          user?
          <div>
            <Button variant="contained" startIcon={<LogoutIcon />} onClick={LogoutGoogle}>Sign Out</Button><br/>
            {UserCtx.Loguser.displayName}<br/>{UserCtx.Loguser.email}<br/>
            <img src={UserCtx.Loguser.photoURL} alt="Profile Photo"/>
          </div> :
            <Button variant="contained" startIcon={<GoogleIcon />} onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
        }
      </Grid>
    </Grid>
    </div>
  );
}

export default LoginPage;
