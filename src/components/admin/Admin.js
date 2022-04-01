import FeatureForm from './FeatureForm';
import PersonForm from "./PersonForm";
import SurveyForm from "./SurveyForm";
import FeatureList from ".//FeatureList";
import PersonList from "./PersonList";
import EvaluationList from "./EvaluationList";
import { Container, Grid } from '@mui/material';

function Admin() {
  return (
    <Container>
      <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} alignItems="center" justify="center">
        <SurveyForm />
        <PersonForm />
        <FeatureForm />
        <FeatureList/>
        <PersonList/>
        <EvaluationList/>

      </Grid>
  </Container>
  );
}
  
export default Admin;
  