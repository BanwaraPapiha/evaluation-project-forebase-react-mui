import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Typography, TextField, Container } from '@mui/material';
import SurveyTable from "./SurveyTable";
import SurveyForm from './SurveyForm';
// import { queryObject } from "./Search";
import queryObject from "./Search";
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
    }, []);

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, eval_data)
    }

    body = queryObject(searchQuery, eval_data);

    return (
      <Container style={{"overflow-x":"auto"}}>  
      <br/><br/>    
        <Typography variant="h4" gutterBottom component="div">
          Manage Surveys
        </Typography>
        <TextField fullWidth label="Search Survey Name" id="search-surveys" onChange={handleSearch}/><br/><br/>
        <SurveyTable title={["Name", "Active", "Toggle Status", "Select"]} body={body}/><br/><br/>
        <SurveyForm/>
    </Container>
    );
  }

export default SurveyList;
  