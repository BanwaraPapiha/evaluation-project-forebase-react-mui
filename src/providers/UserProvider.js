import { UserContext } from "./userCtx"
import { useState } from "react";

export default function UserProvider(props) {
  const [Loguser, setLogUser] = useState([{}]
);

  return (
      <UserContext.Provider value={{Loguser, setLogUser}}>
        {props.children}
      </UserContext.Provider>
    );
  }
