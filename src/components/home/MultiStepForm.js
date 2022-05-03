import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, MobileStepper, Container, Button } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";
import { SurveyCTx } from "../../providers/surveyctx";
import { UserContext } from "../../providers/userCtx";

function MultiStep() {
  const [survUser, setSurvUser] = useState([]);
  const [survFeature, setSurvFeature] = useState([]);
  const UserCtx = useContext(UserContext)
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const current_survey = surveyCtx.survey[0]['id']
  const current_user = UserCtx.Loguser.email;

  const Submit = async () => {
    alert("Submit!");
    console.log(current_user)
    console.log(points.pointsdata)
    try {
      await setDoc(doc(Db, current_survey, current_user), points.pointsdata);
    } catch (e) {
      console.error(e);
    }  
  };

  useEffect(() => {
    const getSurveyFeatures = async () => {
      // const docRef = doc(Db, "surveys", "Work Survey April 2022");
      const docRef = doc(Db, "surveys", current_survey);
      const docSnap = await getDoc(docRef);
      console.log(current_user)
      // Still incomplete
      points.setPointsdata({})
      console.log(points.pointsdata)  
      console.log(docSnap.data().users);
      console.log(docSnap.data().features);
      setSurvUser(docSnap.data().users);
      setSurvFeature(docSnap.data().features)
    };
    getSurveyFeatures();
  }, [current_survey]);

  if (survUser.includes(UserCtx.Loguser.email) && current_survey!=="Not Selected")
  {
    return (
      <Container>
        <Typography variant="button" gutterBottom component="div" style={{"text-align": "center"}}>
          Survey {current_survey}<br/>
          Evaluate All the given users in the following Features Step By Step
        </Typography>
  
        {survFeature.length > 0 ?
         survFeature.map((x, index) => {
          return (
            <UnitStepForm className="UnitSteps" personsList={ survUser } featureName={x} scores={2000} />
            )
         }) : 'Loading'}
       
        <br/>
  
      {
        current_survey!=="Not Selected" && current_user ? <Button variant="contained" color="secondary" onClick={Submit}>Submit</Button>
        : <Button disabled>Submit</Button>
      }
      </Container>
    );  
  
  }
  else if (!survUser.includes(UserCtx.Loguser.email)) {
    return (
      <Container>
        <Typography variant="button" gutterBottom component="div">
        Survey {current_survey}<br/>
        You are not found in the current survey
      </Typography>

      </Container> 
    )
  }
  else if (current_survey==="Not Selected") {
    return (
      <Container>
        <Typography variant="button" gutterBottom component="div">
        Survey {current_survey}<br/>
        Please Select a Survey
      </Typography>

      </Container> 
    )
  }
  else {
    return (
      <Container>
        <Typography variant="button" gutterBottom component="div">
        Survey {current_survey}<br/>
        Some Error Occurred, please ensure that you are alowed to submit a survey and you are choosing the right one
      </Typography>

      </Container> 
    )

  }
}

function MultiStepFormCtx() {
  return (
    <PointsCtxProvider>
      <MultiStep/>
    </PointsCtxProvider>   
  );
}

export default MultiStepFormCtx;
