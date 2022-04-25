import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Typography, TextField, Container } from '@mui/material';
import SurveyTable from "./SurveyTable";
import SurveyForm from './SurveyForm';
import { queryObject } from "./Search";
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
        <Typography variant="h5" gutterBottom component="div">
          Survey
        </Typography>
        <TextField fullWidth label="Search Persons" id="search-persons" onChange={handleSearch}/>
        {/* <SurveyTable title={["Id", "Name", "Active"]} body={body}/> */}
        <SurveyTable title={["Name", "Active"]} body={body}/>
        <SurveyForm/>
    </Container>
    );
  }

export default SurveyList;
  