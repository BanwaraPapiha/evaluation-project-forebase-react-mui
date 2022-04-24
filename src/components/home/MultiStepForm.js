import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, doc, setDoc, getDoc, addDoc } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, MobileStepper, Container } from '@mui/material';
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";
import { SurveyCTx } from "../../providers/surveyctx";
import { UserContext } from "../../providers/userCtx";
import { Routes, Route, useParams } from "react-router-dom";

function MultiStep() {
  const [survUser, setSurvUser] = useState([]);
  const [survFeature, setSurvFeature] = useState([]);
  const [page, setPage] = useState(1);
  const [step, setStep] = useState(1);
  const UserCtx = useContext(UserContext)
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const current_survey = surveyCtx.survey[0]['id']
  var current_user = UserCtx.Loguser.email;

  const Submit = async () => {
    current_user = UserCtx.Loguser.email
    alert("Submit!");
    console.log(points.pointsdata)
    try {
      const docRef = await setDoc(doc(Db, current_survey, UserCtx.Loguser.email), points.pointsdata);
    } catch (e) {
      console.log("Error adding document: ", e);
    }  
  };

  useEffect(() => {
    const getSurveyFeatures = async () => {
      const docRef = doc(Db, "surveys", "Work Survey April 2022");
      const docSnap = await getDoc(docRef);
      // console.log(docSnap.data().users);
      // console.log(docSnap.data().features);
      setSurvUser(docSnap.data().users);
      setSurvFeature(docSnap.data().features)
    };
    getSurveyFeatures();
  }, []);

  return (
    <Container>
      <Typography variant="h5" gutterBottom component="div">
        Survey {current_survey}<br/>
        Evaluate All the given users in the following Features Step By Step
        <MobileStepper variant="dots" steps={survFeature.length} position="static" activeStep={step} sx={{ maxWidth: 400, flexGrow: 1 }}/>
      </Typography>

      {survFeature.length > 0 ?
       survFeature.map((x, index) => {
        return (
          <UnitStepForm stepNo={step} pageNo2={index+1} 
            personsList={ survUser } 
            featureName={x} 
            scores={2000} />
          )
       }) : 'Loading'}

      <button onClick={Submit}>Submit</button>
    </Container>
  );  

}

function MultiStepFormCtx() {
  return (
    <PointsCtxProvider>
      <MultiStep/>
    </PointsCtxProvider>   
  );
}

export default MultiStepFormCtx;
