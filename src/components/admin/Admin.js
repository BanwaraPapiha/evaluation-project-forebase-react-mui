// import FeatureForm from './FeatureForm';
// import PersonForm from "./PersonForm";
// import SurveyForm from "./SurveyForm";
// import FeatureList from ".//FeatureList";
// import PersonList from "./PersonList";
// import EvaluationList from "./EvaluationList";
import SurveyList from "./SurveyList";
import { Container, Grid, Paper, Button } from '@mui/material';
import { useState } from 'react';
import HorizontalLinearStepper from "./testingStep"

function Admin() {
  const [add, setAdd] = useState(false)
  const [page, setPage] = useState(1)

  return (
    <Container>
      <br/>
      <Paper elevation={3} style={{textAlign: "center"}}>

      {/* <Button variant="outlined" style={{}} onClick={()=>{setAdd(!add)}}>
        {add===false?"Create New Survey":"Hide"}
      </Button><br/> */}

      {/* {add===true? <HorizontalLinearStepper show={setAdd}/>: null} */}
      <HorizontalLinearStepper/>
      </Paper>
      
      {/* <SurveyList /> */}
    {/* <EvaluationList/> */}

  </Container>
  );
}
  
export default Admin;
  