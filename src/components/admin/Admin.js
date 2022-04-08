import FeatureForm from './FeatureForm';
import PersonForm from "./PersonForm";
import SurveyForm from "./SurveyForm";
import FeatureList from ".//FeatureList";
import PersonList from "./PersonList";
import EvaluationList from "./EvaluationList";
import SurveyList from "./SurveyList";
import { Container, Grid, Paper } from '@mui/material';
import { useState } from 'react';

function Admin() {
  const [adminpage, setAadminpage] = useState(0)
  const pages = {0: '', 1:<SurveyForm />, 2: <PersonList/>, 3: <FeatureList/>}
  return (
    <Container>
      <br/>
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center">
        <br />
        <Grid item xs={12} md={12}>
          <Paper elevation={3}>
          Create a new Survey
          {pages[adminpage]}
          <button onClick={()=>{setAadminpage(adminpage + 1);alert(adminpage)}}>
            Start New Survey
          </button>
          </Paper>
        </Grid>

        {/* <SurveyForm /> */}
        <SurveyList />
        <PersonForm />
        <FeatureForm />
        {/* <FeatureList/> */}
        {/* <PersonList/> */}
        <EvaluationList/>
        {/* <Tabl123 title={["name", "email"]}/> */}

      </Grid>
  </Container>
  );
}
  
export default Admin;
  