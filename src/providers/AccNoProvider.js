import { AccNoCtx } from "./AccNoCtx"
import { useState } from "react";

export function AccNoProvider(props) {
    const [accObj, setAccObj] = useState([
      {being_eval: 200},
  ]);

  return (
      <AccNoCtx.Provider value={{accObj, setAccObj}}>
        {props.children}
      </AccNoCtx.Provider>
    );
  }
