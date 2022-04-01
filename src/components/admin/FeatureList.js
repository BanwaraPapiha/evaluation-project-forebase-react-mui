import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';

function FeatureList() {
    const [features, setFeatures] = useState([]);
    const usersCollectionRef_features = collection(Db, "features for evaluation");
  
    useEffect(() => {
      const getFeatures = async () => {
        const data = await getDocs(usersCollectionRef_features);
        console.log(data.docs);
        setFeatures(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getFeatures();
    }, []);
    
    return (
      <Container>      
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
        </Typography>
    </Container>
    );
  }
  
  export default FeatureList;
  