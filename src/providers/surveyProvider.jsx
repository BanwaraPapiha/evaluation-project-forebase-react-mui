import { SurveyCTx } from "./surveyctx"
import { useState } from "react";
import { Db } from "../firebase-config/db";
import { collection, query, where, onSnapshot } from "firebase/firestore";

export default function SurveyProvider(props) {
  // const [survey, setSurvey] = useState([]);
  // const [Curr_survey, setCurr_Survey] = useState([]);

  const [survey, setSurvey] = useState({
    name: "February 21",
    active: "No",
    endDate: "15032022",
    startDate: "11032022",
  },
);

const [Curr_survey, setCurr_Surv] = useState({
  name: "February 21",
  active: "No",
  endDate: "15032022",
  startDate: "11032022",
},
);

  const q = query(collection(Db, "surveys"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      querySnapshot.forEach((doc) => {
          cities.push(doc.data().name);
      });
      console.log(cities);
      // setSurvey(cities)
    });

  return (
      <SurveyCTx.Provider value={{survey, setSurvey, Curr_survey, setCurr_Survey}}>
        {props.children}
      </SurveyCTx.Provider>
    );
  }
