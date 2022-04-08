import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import FeatureTable from "./FeatureTable";

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
        </Typography>
        <FeatureTable title={["Id", "Feature", "Total Sum of Scores", "Add", "Delete"]} body={features}/>
    </Container>
    );
  }
  
  export default FeatureList;
  