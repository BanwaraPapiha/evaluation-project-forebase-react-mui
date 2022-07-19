import { Container, Card, Typography, Box } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import LogoutIcon from '@mui/icons-material/Logout';
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState, useContext } from "react";
import { getAuth, GoogleAuthProvider, signInWithRedirect, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../providers/userCtx";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Db } from "../../firebase-config/db";
import { getDoc, doc } from "firebase/firestore";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

const auth = getAuth();
const provider = new GoogleAuthProvider();

function LoginPage() {
  const UserCtx = useContext(UserContext)
  const [admins, setAdmins] = useState([])
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = auth.currentUser;

  const signInWithGoogle = () => {
    signInWithRedirect(auth, provider)
    // signInWithPopup(auth, provider)
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
      UserCtx.setAdmin(false)
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
        // console.log("Admins Data admins_list: ", docSnap.data().admins_list);
        setAdmins(docSnap.data().admins_list)
        console.log("admins")
        console.log(admins)
        console.log(auth.currentUser.email)
        console.log(admins.includes(String(auth.currentUser.email)))
        } else {
        console.log("No admins retrieved");
      }
    }
  
    fetchAdmins()
    console.log(UserCtx.admin)
  }, [auth.currentUser])

  useEffect(()=>{
    const checkAdmins = async () => {
      // console.log("admins")
      // console.log(admins)
      // console.log(auth.currentUser.email)
      // console.log(admins.includes(String(auth.currentUser.email)))
      if (Boolean(auth.currentUser) && admins.length>0) {
        console.log("authentcated check")
        console.log(admins.includes(String(auth.currentUser.email)))
        UserCtx.setAdmin(admins.includes(String(auth.currentUser.email)))
        console.log(UserCtx.admin)
      }
    }
    checkAdmins()
    // console.log(UserCtx.admin)
  }, [auth.currentUser, admins])

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // const uid = user.uid;
      UserCtx.setLogUser(user)
      // console.log(UserCtx.admin)
    } else {
      // User is signed out
      UserCtx.setLogUser(null)
    }
  });

  return (
    <Container>
      <Card elevation={5}
      sx={{
        padding: '10px', margin: '30px auto auto auto', //backgroundColor: 'secondary.light',
        // backgroundColor: 'rgba(255, 192, 203, 0.5)', color: 'green',
        width: { xs: '80vw', sm: '80vw', md: '400px', lg: '400px', xl: '400px' },
        display: 'flex', justifyContent: 'center',
        }}>
      {
          user?
          <div>
            <img style={{"border-radius": "50%", border: "1px solid black", margin: '5px auto 5px 30%', padding: '5px', width: '100px'}} src={UserCtx.Loguser.photoURL} alt="Profile Photo"/>
            <Box>
              <Typography align='center'>{UserCtx.Loguser.displayName}</Typography>
              <Typography align='center'>{UserCtx.Loguser.email}</Typography>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
              <Button variant="contained" onClick={handleClickOpen} color='success'>Select a Survey</Button><br/>
              <Button variant="contained" startIcon={<LogoutIcon />} onClick={LogoutGoogle} color='error'>Sign Out</Button><br/>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  <Typography style={{minWidth: 300}}>
                  Select a Survey
                  </Typography>
                  {/* {"Select a Survey"} */}
                </DialogTitle>
                <DialogContent>
                  <List dense={true}>
                    <ListItemButton role={undefined} onClick={()=>alert()} dense>
                          <ListItemText
                            primary="Single-line item"
                            secondary={'Secondary text'}
                          />
                    </ListItemButton>
                  </List>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} autoFocus>Close</Button>
                </DialogActions>
              </Dialog>

            </Box>
          </div> :
          <div>
            <Box>
              <Typography align='center'>dxtcfgh</Typography>
              <Typography align='center'>fdghg</Typography>
            </Box>
            <Button variant="contained" startIcon={<GoogleIcon />} onClick={signInWithGoogle} style={{display: 'flex', justifyContent: 'center',}}>
              Sign in with Google
            </Button>
          </div>
        }

      </Card>

    </Container>
  );
}

export default LoginPage;
