import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { Paper, Typography, Button, TextField, Container, Stack, Grid } from '@mui/material';
import FeatureTable from "./FeatureTable";
import { queryObject } from "./searchFx"
import { doc, onSnapshot } from "firebase/firestore";
import FeatureAddOnlyForm from "./FeatureAddOnly";
import { SurveyCTx } from "../../providers/surveyctx";

function FeatureList() {
    const [features, setFeatures] = useState([]);
    const usersCollectionRef_features = collection(Db, "features for evaluation");
    const [searchQuery, setSearchQuery] = useState("");
    const [addedFeatures, setFeaturesUsers] = useState([]);
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['name']

    var body = [];

    useEffect(() => {
      const getFeatures = async () => {
        const querySnapshot = await getDocs(usersCollectionRef_features);
        const unsubscribe = onSnapshot(usersCollectionRef_features, (querySnapshot) => {
            setFeatures(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          });
        }
        getFeatures();
    }, []);

    useEffect(() => {
      const unsub = onSnapshot(doc(Db, "surveys", Curr_survey), (doc) => {
        const featuresHere = doc.data().features
        console.log("Current data: ", featuresHere);
        setFeaturesUsers(featuresHere)
    });
    }, [])

    const handleSearch = (e) => {
      setSearchQuery(e.target.value)
      queryObject(searchQuery, features)
    }
    body = queryObject(searchQuery, features);

    return (
      <Container>      
        <Typography variant="h5" gutterBottom component="div">Features</Typography>
        <TextField fullWidth label="Search Feature" id="search-feature" onChange={handleSearch}/>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FeatureTable title={["Id", "Feature", "Total Sum of Scores", "Add", "Delete"]} body={body}/>
          </Grid>
          <Grid item xs={12} md={6}>
            <div>
              {addedFeatures.map((x)=>{
                return (
                  <li>{x}</li>
                )
              })}
            </div>
          </Grid>
        </Grid>
        <FeatureAddOnlyForm id="FeatureAddOnlyForm"/><br/>

    </Container>
    );
  }
  
  export default FeatureList;
  