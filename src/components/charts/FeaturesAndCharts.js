import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Only_Table from '../common/onlyTable';
import ChartsTable from '../common/anotherTable'
import { collection, getDocs } from "firebase/firestore";
import { Grid, Container } from '@mui/material';

function FeaturesAndCharts() {
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
                <h1>Features</h1>
                {features.map((fetr) => {
                  return (
                      <div>
                        {" "}
                        <div>id: {fetr.id}</div>
                        <div>feature: {fetr.feature}</div>
                        <div>total_score: {fetr.total_score}</div>
                        <br></br>
                      </div>
                  );
                })}
            </Grid>

            <Grid item xs={12} md={6}>
              <Container maxWidth="sm">
              <LineChart width={600} height={300} data={eval_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="score_awarded" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="feature" />
                <YAxis />
                <Tooltip />
              </LineChart>

              </Container>
            </Grid>

        </Grid>
    );
  }

export default FeaturesAndCharts;