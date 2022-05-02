import { Grid, Typography, Divider, Box } from '@mui/material';
import UnitComponent from "./UnitComponent";
import { useState } from "react";

function UnitStepForm(props) {
  const [listData, setListData] = useState({});
  return (
    <>
      <Typography variant="h5" gutterBottom component="div" style={{"text-align": "center", "height": "20vh", "margin-top": "20vh"}}>
        Feature Seleted is: {props.featureName}
        <br/>
        You have total {props.scores} Scores to distribute
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
