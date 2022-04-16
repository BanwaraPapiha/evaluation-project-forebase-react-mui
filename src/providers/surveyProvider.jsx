import { SurveyCTx } from "./surveyctx"
import { useState } from "react";
import { Db } from "../firebase-config/db";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function SurveyProvider(props) {
  const [survey, setSurvey] = useState([{
    id: "Not Selected",
    name: "Not Selected",
    active: "Not Selected",
    endDate: "Not Selected",
    startDate: "Not Selected",
  }]
);

  return (
      <SurveyCTx.Provider value={{survey, setSurvey}}>
        {props.children}
      </SurveyCTx.Provider>
    );
  }
