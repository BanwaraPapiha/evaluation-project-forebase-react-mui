import { Button, Grid } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../providers/userCtx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Db } from "../../firebase-config/db";
import { getDoc, doc } from "firebase/firestore";

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
  const [admins, setAdmins] = useState([])

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
      UserCtx.setLogUser(null)
      // UserCtx.setAdmin(false)
      // Sign-out successful.
    }).catch((error) => {
        console.log(error)
      // An error happened.
    });
  }

  useEffect(()=>{
    const fetchAdmins = async () => {
      const docSnap = await getDoc(doc(Db, "Admins", "admins_list"));
      if (docSnap.exists()) {
        // console.log("Admins Data: ", docSnap.data());
        // console.log("Admins Data admins_list: ", docSnap.data().admins_list);
        setAdmins(docSnap.data().admins_list)
        console.log("admins")
        console.log(admins)
        console.log(auth.currentUser.email)
        // console.log(Object.keys(admins).includes(String(auth.currentUser.email)))
        // console.log(Object.values(admins).includes(String(auth.currentUser.email)))
        // console.log(Object.values(admins)[0].includes(String(auth.currentUser.email)))
        console.log(admins.includes(String(auth.currentUser.email)))
        if (auth.currentUser && admins.length>0) {
          // console.log(admins)
          // console.log(auth.currentUser.email)
          console.log("authentcated check")
          console.log(admins.includes(String(auth.currentUser.email)))
          UserCtx.setAdmin(admins.includes(String(auth.currentUser.email)))
          console.log(UserCtx.admin)
        }
    
      } else {
        console.log("No admins retrieved");
      }
    }
    fetchAdmins()
    console.log(UserCtx.admin)
  }, [auth.currentUser])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      UserCtx.setLogUser(user)
      // console.log(admins)
      // console.log(auth.currentUser.email)
      console.log(UserCtx.admin)

    } else {
      // User is signed out
      UserCtx.setLogUser(null)
    }
  });

  console.log(UserCtx.admin)

  return (
    <div className={classes.root}>
    <Grid className={classes.root} spacing={1} alignItems="center" justify="center">
      <Grid item xs={12} md={8}>
        {
          user?
          <div>
            <img style={{"border-radius": "50%", border: "1px solid black"}} src={UserCtx.Loguser.photoURL} alt="Profile Photo"/><br/>
            {UserCtx.Loguser.displayName}<br/>{UserCtx.Loguser.email}<br/>
            <Button variant="contained" startIcon={<LogoutIcon />} onClick={LogoutGoogle}>Sign Out</Button><br/>
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
