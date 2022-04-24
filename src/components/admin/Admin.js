import * as React from 'react';
import SurveyList from "./SurveyList";
import SurveyForm from "./SurveyForm";
import FeatureList from "./FeatureList";
import PersonList from "./PersonList";
import { Stepper, Step, StepLabel, Button, Container, Grid, Paper } from '@mui/material';
import { useState } from 'react';

const steps = ['Create Survey', 'Select Persons', 'Add Features'];
export default function Admin(props) {
    const [page, setPage] = useState(0)
    const pages = {0:<SurveyList />, 1: <PersonList/>, 2: <FeatureList/>}
    const NextPage = () => {
      setPage(currPage => currPage + 1);
    };
    const PrevPage = () => {
      setPage(currPage => currPage - 1);
    };

    return (
      <Container>
        <br/>
        <Paper elevation={3} style={{textAlign: "center"}}>
        <br/>
        <div>
            <Stepper activeStep={page} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {pages[page]}

            {page<=0?<Button variant="text" disabled>Back</Button>:
            <Button variant="text" onClick={()=>{PrevPage(page)}}>Back</Button>}
            {page>=steps.length-1?<Button variant="text" onClick={()=>{alert("Submitted!");}}>Finish</Button>
            :<Button variant="text" onClick={()=>{NextPage(page)}}>Next</Button>}
        </div>
        </Paper>
      </Container>
  );
}
