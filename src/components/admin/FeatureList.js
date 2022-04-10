import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import FeatureTable from "./FeatureTable";
import { queryObject } from "./searchFx"
import { doc, onSnapshot } from "firebase/firestore";

function FeatureList() {
    const [features, setFeatures] = useState([]);
    const usersCollectionRef_features = collection(Db, "features for evaluation");
    const [searchQuery, setSearchQuery] = useState("");
    var body = [];

    // useEffect(() => {
    //   const getFeatures = async () => {
    //     const data = await getDocs(usersCollectionRef_features);
    //     console.log(data.docs);
    //     setFeatures(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   };
    //   getFeatures();
    // }, []);

    useEffect(() => {
      const getFeatures = async () => {
        const querySnapshot = await getDocs(usersCollectionRef_features);
        const unsubscribe = onSnapshot(usersCollectionRef_features, (querySnapshot) => {
            // const featuress = [];
            // querySnapshot.forEach((doc) => {
            //   console.log(doc.id, " => ", doc.data());
            //   personss.push(doc.data().feature);
            //   console.log(doc.id, " => ", doc.data().feature);
            // });
            // console.log("Current featuress length: ", typeof(featuress));
    
            // for (const property in featuress) {
            //   console.log(`${property}: ${featuress[property]}`);
            // }
            setFeatures(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
        }
        getFeatures();
    }, []);

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, features)
    }
    body = queryObject(searchQuery, features);

    return (
      <Container>      
        <Typography variant="h5" gutterBottom component="div">
          <h1>Features</h1>
        </Typography>

        <TextField fullWidth label="Search Feature" id="search-feature" onChange={handleSearch}/>

        <FeatureTable title={["Id", "Feature", "Total Sum of Scores", "Add", "Delete"]} body={body}/>
    </Container>
    );
  }
  
  export default FeatureList;
  