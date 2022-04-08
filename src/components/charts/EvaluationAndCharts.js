import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Only_Table from '../common/onlyTable';
import ChartsTable from '../common/anotherTable'
import { collection, getDocs } from "firebase/firestore";
import { Grid } from '@mui/material';

function EvaluatioonAndCharts() {
    const [features, setFeatures] = useState([]);
    const [persons, setPersons] = useState([]);
    const [eval_data, setEval_data] = useState([]);
    const usersCollectionRef_features = collection(Db, "features for evaluation");
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    const usersCollectionRef_eval_data = collection(Db, "evaluation data");
  
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
          const data = await getDocs(usersCollectionRef_eval_data);
          console.log("check");
          console.log(data.docs);
          setEval_data(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getEvaluationData();
      }, []);
    
      return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <h1>Evaluation Data</h1>
                {eval_data.map((ed) => {
                return (
                    <div>
                        <h5>
                        id: {ed.id}
                        | being_evaluated: {ed.being_evaluated} 
                        | evaluator: {ed.evaluator}
                        | feature: {ed.feature}
                        | score_awarded: {ed.score_awarded}
                        | total_score: {ed.total_score}
                        </h5>
                    </div>
                );
                })}
            </Grid>
        </Grid>
    );
  }
export default EvaluatioonAndCharts;