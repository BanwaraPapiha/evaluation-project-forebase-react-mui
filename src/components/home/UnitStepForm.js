import { Grid, Typography } from '@mui/material';
import { useState } from 'react';
import UnitComponent from "./UnitComponent";

function UnitStepForm(props) {
  const items = []
  const [availableScore, setAvailableScore] = useState(items);
  const [childdata, setChildData] = useState({});
  
  const updateScore = (state) => {
    setAvailableScore(state);
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom component="div">
        Step Number is: {props.stepNo} And Page Number is: {props.pageNo2} <br/>
        Feature Seleted is: {props.featureName}
        <br/>
        You have total {props.scores} Scores to distribute
      </Typography>

      <Grid container spacing={2}>
        { props.personsList.map((prsn) => {
        return (
          <UnitComponent 
            person={prsn}  
            featureId={props.featureId} 
            updateScore={updateScore} t_scores={props.scores}
            feature_score={ props.scores }
            availableScoreList={availableScore[props.featureId]={}} 
            parentData={childdata} 
            updateParent={setChildData}
          />
        );
        })}
      </Grid>

    </div>
  );
}

export default UnitStepForm;
