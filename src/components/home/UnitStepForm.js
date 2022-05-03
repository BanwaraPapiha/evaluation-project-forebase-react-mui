import { Grid, Typography, Divider, Box } from '@mui/material';
import UnitComponent from "./UnitComponent";
// import { useState } from "react";
import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";

function UnitStepForm(props) {
  const [listData, setListData] = useState({});
  console.log(props.featureName)

  const [fet_scor, setFet_scor] = useState(0)
  const surveyCtx = useContext(SurveyCTx)
  const Curr_survey = surveyCtx.survey[0]['id']

  useEffect(()=>{
      const getScore = async () => {
          const docSnap = await getDoc(doc(Db, "all_features", props.featureName));
          if (docSnap.exists()) {
              console.log("Document data:", docSnap.data());
              console.log("Document data Curr_survey:", docSnap.data()[Curr_survey]);
              setFet_scor(Number(docSnap.data()[Curr_survey]))
          } else {
              console.log("No such document! about current survey feature value");
          }    
      }
      getScore();
  })

  console.log(fet_scor)

  return (
    <>
      <Typography variant="h5" gutterBottom component="div" style={{"text-align": "center", "height": "20vh", "margin-top": "20vh"}}>
        Feature Seleted is: {props.featureName}
        <br/>
        {/* You have total {props.scores} Scores to distribute <br/> */}
        You have total {fet_scor} Scores to distribute
      </Typography>
      <Divider/>
      <br/>

      <Grid container spacing={2}>
        { props.personsList.map((prsn) => {
        return (
          <UnitComponent 
            person={prsn} feature={props.featureName} t_scores={props.scores} listData={listData} setListData={setListData}
          />
        );
        })}
      </Grid>
      <br/>
      <Divider />
    </>
  );
}

export default UnitStepForm;
