import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Only_Table from '../common/onlyTable';
import ChartsTable from '../common/anotherTable'
import { collection, getDocs, doc, onSnapshot } from "firebase/firestore";
import { Grid } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";

function EvaluatioonAndCharts() {
    const [features, setFeatures] = useState([]);
    const [persons, setPersons] = useState([]);
    const [eval_data, setEval_data] = useState([]);
    const usersCollectionRef_features = collection(Db, "features for evaluation");
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    const usersCollectionRef_eval_data = collection(Db, "evaluation data");
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const taskDocRef = doc(Db, "surveys", Curr_survey)
    // const usersCollectionRef_CurSur = collection(Db, "Jan 29");
    const usersCollectionRef_CurSur = collection(Db, Curr_survey);

    useEffect(() => {
        const getFeatures = async () => {
          const data = await getDocs(usersCollectionRef_features);
          console.log(data.docs);
          setFeatures(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getFeatures();
      }, []);
    
      useEffect(() => {
        const getPersons = async () => {
          const data = await getDocs(usersCollectionRef_persons);
          console.log(data.docs);
          setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPersons();
      }, []);

      useEffect(() => {
        const getEvaluationData = async () => {
          
          const unsub = onSnapshot(doc(Db, "NewEvalData", Curr_survey), (doc) => {
              const propertyValues = Object.values(doc.data());
              console.log(propertyValues)
              setEval_data(propertyValues);
          });
        }
        getEvaluationData();
  
      }, []);
    
      return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={8}>
              <h1>Evaluation Data</h1>
              <table style={{width: "100%"}}>
                <thead>
                  <th>Id</th>
                  <th>Evaluator</th>
                  <th>Being Evaluated</th>
                  <th>Feature</th>
                  <th>Score</th>
                  <th>Survey</th>
                </thead>
                <tbody>
                {eval_data.map((ed) => {
                  return (
                      <tr>
                        <td>{ed.id}</td>
                        <td>{ed.evaluator}</td>
                        <td>{ed.being_eval}</td>
                        <td>{ed.feature}</td>
                        <td>{ed.points}</td>
                        <td>{ed.survey}</td>
                      </tr>
                  );
                  })}

                </tbody>
              </table>

            </Grid>
        </Grid>
    );
  }
export default EvaluatioonAndCharts;