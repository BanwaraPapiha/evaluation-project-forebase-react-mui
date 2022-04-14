import { SurveyCTx } from "./surveyctx"
import { useState } from "react";
import { Db } from "../firebase-config/db";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function SurveyProvider(props) {
  const [survey, setSurvey] = useState([{
    name: "February 21",
    active: "No",
    endDate: "15032022",
    startDate: "11032022",
  }]
);

  return (
      <SurveyCTx.Provider value={{survey, setSurvey}}>
        {props.children}
      </SurveyCTx.Provider>
    );
  }
