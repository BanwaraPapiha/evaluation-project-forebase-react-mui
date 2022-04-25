import { UserContext } from "./userCtx"
import { useState } from "react";

export default function UserProvider(props) {
  const [Loguser, setLogUser] = useState({});
  const [admin, setAdmin] = useState(false)    
  return (
    <UserContext.Provider value={{Loguser, setLogUser, admin, setAdmin}}>
      {props.children}
    </UserContext.Provider>
    );
  }
