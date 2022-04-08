import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import SurveyTable from "./SurveyTable";

function SurveyList() {
    const [eval_data, setEval_data] = useState([]);
    const usersCollectionRef_eval_data = collection(Db, "surveys");

    useEffect(() => {
      const getEvaluationData = async () => {
        const data = await getDocs(usersCollectionRef_eval_data);
        console.log(data.docs);
        setEval_data(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getEvaluationData();
    }, []);

    return (
      <Container>      
        <Typography variant="h5" gutterBottom component="div">
          <h1>survey</h1>
        </Typography>
        <SurveyTable title={["Id", "Name", "Start Date", "End Date", "Active", "Participants", "Select"]} body={eval_data}/>
    </Container>
    );
  }
  
  export default SurveyList;
  