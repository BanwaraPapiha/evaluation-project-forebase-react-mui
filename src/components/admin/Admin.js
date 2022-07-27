import * as React from 'react';
import SurveyList from "./SurveyList";
import FeatureList from "./FeatureList";
import PersonList from "./PersonList";
import { Stepper, Step, StepLabel, Button, Container, Grid, Paper, Snackbar, Alert, Slide } from '@mui/material';
import { useState, useContext } from 'react';
import {SurveyCTx} from "../../providers/surveyctx";
import { useNavigate } from 'react-router-dom';
import PersonAcDc from './Category';

const steps = ['Create Survey', 'Manage Persons', 'Manage Categories', 'Manage Features'];

export default function Admin(props) {
  const [page, setPage] = useState(0)
  const CurrentSurvey = useContext(SurveyCTx);
    const pages = {0:<SurveyList />, 1: <PersonList/>, 2: <PersonAcDc/>, 3: <FeatureList/>}
    const NextPage = () => {
      setPage(currPage => currPage + 1);
    };
    const PrevPage = () => {
      setPage(currPage => currPage - 1);
    };

    const navigate = useNavigate()
  
    const handleFinish = () => {
      navigate('/survey', { replace: true });
  }
    return (
      <Container>
        {/* <br/> */}
        <Paper elevation={3} style={{textAlign: "center", padding: 10, margin: 10}}>
        {/* <br/> */}
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
            {page>=steps.length-1?<Button variant="text" onClick={handleFinish}>Finish</Button>
            :<Button variant="text" onClick={()=>{NextPage(page)}}>Next</Button>}
        </div>

        </Paper>
      </Container>
  );
}
