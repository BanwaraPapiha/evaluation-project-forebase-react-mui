import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import ChartsTable from '../common/anotherTable'
import { collection, getDocs } from "firebase/firestore";
import EvaluatioonAndCharts from "./EvaluationAndCharts";
import PersonsAndCharts from "./PersonsAndCharts";
import FeaturesAndCharts from "./FeaturesAndCharts";

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
        <div>
            Charts <br/>
            visible to admin only for each username <br/>
            shows record of what other users have evaluated a specific username <br/>
            ac/de-celerate <br/>

            <EvaluatioonAndCharts />
            <PersonsAndCharts />
            <FeaturesAndCharts />
        </div>
    );
  }
export default Charts;