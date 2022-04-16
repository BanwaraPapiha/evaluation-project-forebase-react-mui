import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import SurveyTable from "./SurveyTable";
import SurveyForm from './SurveyForm';
import { queryObject } from "./searchFx";
import { doc, onSnapshot } from "firebase/firestore";

function SurveyList() {
    const [eval_data, setEval_data] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const usersCollectionRef_eval_data = collection(Db, "surveys");

    var body = [];
    useEffect(() => {
      const getEvaluationData = async () => {
        const querySnapshot = await getDocs(usersCollectionRef_eval_data);
        const unsubscribe = onSnapshot(usersCollectionRef_eval_data, (querySnapshot) => {
          setEval_data(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
        }
        getEvaluationData();

      // const getEvaluationData = async () => {
      //   const data = await getDocs(usersCollectionRef_eval_data);
      //   console.log(data.docs);
      //   setEval_data(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // };
      // getEvaluationData();
    }, []);

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, eval_data)
    }

    body = queryObject(searchQuery, eval_data);

    return (
      <Container>      
        <Typography variant="h5" gutterBottom component="div">
          Survey
        </Typography>
        <TextField fullWidth label="Search Persons" id="search-persons" onChange={handleSearch}/>
        {/* <SurveyTable title={["id", "Name", "Start Date", "End Date", "Active"]} body={body}/> */}
        <SurveyTable title={["Name", "Active"]} body={body}/>
        <SurveyForm/>
    </Container>
    );
  }

export default SurveyList;
  