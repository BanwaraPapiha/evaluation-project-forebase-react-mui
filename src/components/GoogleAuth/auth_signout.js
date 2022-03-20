import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
signOut(auth).then(() => {
    console.log("Sign Out Successful")
  // Sign-out successful.
}).catch((error) => {
    console.log(error)
  // An error happened.
});
