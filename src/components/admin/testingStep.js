import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SurveyList from "./SurveyList";
import SurveyForm from "./SurveyForm";
import FeatureList from ".//FeatureList";
import PersonList from "./PersonList";

import { useState } from 'react';
import { PinDropSharp } from '@material-ui/icons';

const steps = ['Create Survey', 'Select Persons', 'Add Features', "Finish"];

export default function HorizontalLinearStepper(props) {
    const [page, setPage] = useState(0)
    // const pages = {0:<SurveyForm />, 1: <PersonList/>, 2: <FeatureList/>, 3: <div>Summary</div>}
    const pages = {0:<SurveyList />, 1: <PersonList/>, 2: <FeatureList/>, 3: <div>Summary</div>}
    const NextPage = () => {
      setPage(currPage => currPage + 1);
    };
    const PrevPage = () => {
      setPage(currPage => currPage - 1);
    };

    return (
      <>
        <br/>
        <div>
            <Stepper activeStep={page} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {page<=0?<Button variant="text" disabled>Back</Button>:
            <Button variant="text" onClick={()=>{PrevPage(page)}}>Back</Button>}
            {page>=steps.length-1?<Button variant="text" onClick={()=>{alert();props.show(false)}}>Finish</Button>
            :<Button variant="text" onClick={()=>{NextPage(page)}}>Next</Button>}

            {pages[page]}
        </div>
      </>
  );
}
