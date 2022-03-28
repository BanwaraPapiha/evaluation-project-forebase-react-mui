import Login from "./Login";
import { signInWithGoogle } from "../../firebase-config/AuthGoogle";
import { Paper, Typography, Button, TextField, Container, Stack, Grid, Card } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "white",
    minWidth: "100%",
    minHeight: "100vh",
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
  return (
    <Grid className={classes.root} spacing={1} alignItems="center" justify="center">
      <Grid item xs={12} md={8} style={{}}>
      {/* <Paper elevation={3}> */}
          {/* <Stack spacing={3}> */}
            <br />
            <Button variant="contained" startIcon={<GoogleIcon />} onClick={ signInWithGoogle }>
              Sign in with Google
            </Button>
            <h1>{localStorage.getItem("name")}</h1>
            <h1>{localStorage.getItem("email")}</h1>
            <img src={localStorage.getItem("profilePic")} />
          {/* </Stack> */}
        {/* </Paper> */}
      </Grid>

    </Grid>
  );
}

export default LoginPage;
