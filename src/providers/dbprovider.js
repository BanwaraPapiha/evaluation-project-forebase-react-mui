import { DBContext } from "./dbcontext"
import { useState } from "react";

export function DBContextProvider(props) {
    const [user, setUser] = useState("Jesse Hall");
  
    return (
      <DBContext.Provider value={user}>
        {props.children}
      </DBContext.Provider>
    );
  }
  