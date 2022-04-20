import { Grid, Typography } from '@mui/material';
import UnitComponent from "./UnitComponent";
import { useState } from "react";

function UnitStepForm(props) {
  const [listData, setListData] = useState({});
  return (
    <div>
      <Typography variant="h6" gutterBottom component="div">
        Step Number is: {props.stepNo} And Page Number is: {props.pageNo2} <br/>
        Feature Seleted is: {props.featureName}
        <br/>
        You have total {props.scores} Scores to distribute
        JSON.parse(props.feature).scores <br/>
        {props.scores}
      </Typography>

      <Grid container spacing={2}>
        { props.personsList.map((prsn) => {
        return (
          <UnitComponent 
            person={prsn} feature={props.featureName} t_scores={props.scores} listData={listData} setListData={setListData}
          />
        );
        })}
      </Grid>

    </div>
  );
}

export default UnitStepForm;
