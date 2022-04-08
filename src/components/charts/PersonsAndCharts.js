import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ChartsTable from '../common/anotherTable'
import { collection, getDocs } from "firebase/firestore";
import { Grid, Container } from '@mui/material';
import * as V from 'victory';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

function PersonsAndCharts() {
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
            <ChartsTable table_datum={persons}/> 
          </Grid>

          <Grid item xs={12} md={6}>
            <Container maxWidth="sm">
              <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
                {
                  persons.length>=1 ?
                  <VictoryBar data={persons} x="Name" y="Total_sum_Score" />
                  : 
                  <VictoryBar />
                }
             </VictoryChart>
            {console.log(persons.length)}

            </Container>
          </Grid>

        </Grid>
    );
  }
export default PersonsAndCharts;