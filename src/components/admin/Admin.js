import FeatureForm from './FeatureForm';
import PersonForm from "./PersonForm";
import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import Only_Table from '../common/onlyTable';

function Admin() {
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
        console.log(data);
        console.log("check");
        console.log(data.docs);
        setEval_data(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getEvaluationData();
    }, []);

    return (
      <Container>
      <br />
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center">
        
        <PersonForm />
        <FeatureForm />

        <Typography variant="h5" gutterBottom component="div">
        <h1>Persons</h1>
        {persons.map((prsn) => {
          return (
            <div>
              <h5>id: {prsn.id} | Name: {prsn.Name} | Email: {prsn.Email}</h5>
            </div>
          );
        })}
        </Typography>
      
        <Typography variant="h5" gutterBottom component="div">
          <h1>Features</h1>
          {features.map((fetr) => {
            return (
              <div>
                <h5>id: {fetr.id}</h5>
                <h5>feature: {fetr.feature}</h5>
                <h5>total_score: {fetr.total_score}</h5>
              </div>
            );
          })}
          control the accelerate and ecelerate values <br/>
          ...
        </Typography>
    </Grid>
    </Container>
    );
  }
  
  export default Admin;
  