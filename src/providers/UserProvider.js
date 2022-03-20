import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../firebase-config/AuthGoogle";

export const UserContext = createContext({user: null})

export default (props) => {
  const [user, setuser] = useState(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
    const { displayName, email, photoURL }  = user;
    setuser({
        displayName,
        email,
        photoURL
        })
    })
  },[])
  return (
    <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
  )
}
