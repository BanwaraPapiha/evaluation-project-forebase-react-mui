import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';

function EvaluationList() {
    const [eval_data, setEval_data] = useState([]);
    const usersCollectionRef_eval_data = collection(Db, "evaluation data");
      
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
        <Typography variant="h5" gutterBottom component="div">
          <h1>eval_data</h1>
          {eval_data.map((fetr) => {
            return (
              <div>
                <h5>id: {fetr.id}</h5>
              </div>
            );
          })}
        </Typography>
    </Container>
    );
  }
  
  export default EvaluationList;
  