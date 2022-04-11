import FeatureForm from './FeatureForm';
import PersonForm from "./PersonForm";
import SurveyForm from "./SurveyForm";
import FeatureList from ".//FeatureList";
import PersonList from "./PersonList";
import EvaluationList from "./EvaluationList";
import SurveyList from "./SurveyList";
import { Container, Grid, Paper, Button, Stepper, Step, StepLabel } from '@mui/material';
import { useState } from 'react';

function Admin() {
  const [adminpage, setAadminpage] = useState(0)
  const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

  const pages = {0: '', 1:<SurveyForm />, 2: <PersonList/>, 3: <FeatureList/>}
  return (
    <Container>
      {/* <br/>
    <Stepper activeStep={1} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper> */}

      <br/>
      <Paper elevation={3} style={{margin: "auto"}}>
      <Button variant="outlined" onClick={()=>{setAadminpage(adminpage + 1);alert(adminpage)}}>
        Start New Survey
      </Button>
      {pages[adminpage]}

      </Paper>
    {/* </Grid> */}

    <SurveyList />
    <EvaluationList/>

  </Container>
  );
}
  
export default Admin;
  