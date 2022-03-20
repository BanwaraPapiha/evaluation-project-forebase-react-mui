import { Grid } from '@mui/material';
import { useContext, useState } from 'react';
import UserContext from "./MultiStepForm";
import UnitComponent from "./UnitComponent";
// import UnitComponent from "./unitCard";
import {
  collection,
  getDocs,
  // addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

function UnitStepForm( props) {
  const user = useContext(UserContext);
  console.log(props.personsList.length)
  const steps = new Array(props.personsList.length)
  const [scroreDone, setScoreDone] = useState(0);
  const [newScoreRange, setNewScoreRange] = useState(props.scores);
  const [step, setStep] = useState(steps);
  const [stepData, setStepData] = useState([
    {"being_evaluated": "", "evaluator": "", "feature": "", "score_awarded": "", "timestamp": "", "total_score": ""}, 
  ]);

  const handleStepData = (stepdatum) => {
    alert("Step Data Fx Working")
    // const newStepData = [...stepData];
    // newStepData.push(stepdatum);
    // setStepData(newStepData);
  }
  
  const updateSteps = (id, value) => {
    console.log("update step is running")
    setStep(steps.map((s) => ({ ...s.value, id: s.id })));
    setStep(steps.push({"id":id,"value":value}));
    console.log(step);
  }

  const updatePage = score => {
    setScoreDone(score);
    setNewScoreRange(props.scores-scroreDone);
    console.log(newScoreRange)
 }
  return (
        <div>
          <Typography variant="h6" gutterBottom component="div">
          Feature Seleted is: {props.featureName}
          <br/>
          You have total {props.scores} Scores to distribute
          </Typography>

          <Grid container spacing={2}>
            { props.personsList.map((prsn) => {
            return (              
                <UnitComponent person={prsn} scores={props.scores} feature={props.featureId} handleStepData={handleStepData} updateSteps={updateSteps} scroreDone={scroreDone} newScoreRange={newScoreRange} updatePage={updatePage} />
            );
            })}
          </Grid>

        </div>
          );
}

export default UnitStepForm;
