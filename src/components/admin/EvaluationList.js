import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, query, limit, where, doc, onSnapshot } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import EvaluationTable from "./EvaluationTable";
import { SurveyCTx } from "../../providers/surveyctx";

function EvaluationList() {
    const surveyCtx = useContext(SurveyCTx);
    const [eval_data, setEval_data] = useState([]);
    const currentSurvey = surveyCtx.survey['name'];
    const usersCollectionRef_eval_data = query(collection(Db, "evaluation data"), where("survey", "==", currentSurvey));

  useEffect(() => {
    // const getEvaluationData = async () => {
    //   const data = await getDocs(usersCollectionRef_eval_data);
    //   console.log(data);
    //   console.log(`eval data for ${currentSurvey}`);
    //   console.log(data.docs);
    //   setEval_data(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    // };

    const getEvaluationData = async () => {
      const querySnapshot = await getDocs(usersCollectionRef_eval_data);
      const unsubscribe = onSnapshot(usersCollectionRef_eval_data, (querySnapshot) => {
        const surveyss = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          surveyss.push(doc.data().evaluator);
          console.log(doc.id, " => ", doc.data().evaluator);
          // surveyss.push(doc.data().evaluator);
        });
        // console.log("Current surveyss in CA: ", surveyss.join(", "));
        console.log("Current surveyss length: ", typeof(surveyss));

        for (const property in surveyss) {
          console.log(`${property}: ${surveyss[property]}`);
        }

        // for (const [key, value] of Object.entries(object1)) {
        //   console.log(`${key}: ${value}`);
        // }
        
        // Set the State
        setEval_data(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      });
    }
    getEvaluationData();
  }, []);

  return (
    <Container>      
      <Typography variant="h5" gutterBottom component="div">
        <h1>eval_data</h1>
      </Typography>
      <EvaluationTable title={["id", "Survey", "being_eval", "evaluator", "feature", "points", "delete", "timestamp"]} body={eval_data}/>
  </Container>
  );
}
export default EvaluationList;