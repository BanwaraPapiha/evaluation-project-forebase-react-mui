import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { collection, getDocs } from "firebase/firestore";
import EvaluatioonAndCharts from "./EvaluationAndCharts";
import PersonsAndCharts from "./PersonsAndCharts";
import FeaturesAndCharts from "./FeaturesAndCharts";
import AllData from "./EveryDataProvider";
import { Container } from '@mui/material';

function Charts() {
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
        <Container>
            <AllData/>
            {/* <EvaluatioonAndCharts />
            <PersonsAndCharts />
            <FeaturesAndCharts /> */}
        </Container>
    );
  }
export default Charts;