import { DBContext } from "./dbcontext"
import { useState } from "react";

export function DBContextProvider(props) {
    const [formdata, setFormData] = useState([
      {
          points: 200, 
          evaluator: "Me", 
          being_eval: "You",
          feature: "Truthfulness"
      },
      {
          points: 200, 
          evaluator: "Me1", 
          being_eval: "You1",
          feature: "Truthfulness1"
      },
      {
          points: 200, 
          evaluator: "Me2", 
          being_eval: "You2",
          feature: "Truthfulness2"
      },
  ]);

  return (
      <DBContext.Provider value={{formdata, setFormData}}>
        {props.children}
      </DBContext.Provider>
    );
  }
