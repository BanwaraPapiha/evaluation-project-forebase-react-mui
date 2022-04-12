import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, addDoc } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, Container, Grid } from '@mui/material';
import { DBContext } from "../../providers/dbcontext";
import { DBContextProvider } from "../../providers/dbprovider";
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";
import { SurveyCTx } from "../../providers/surveyctx";

function MultiStep() {
  const [features, setFeatures] = useState([]);
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1)
  const [survey, setSurvey] = useState([]);
  const {formdata, setFormData} = useContext(DBContext);
  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const current_survey = surveyCtx.survey['name']
  const usersCollectionRef_features = collection(Db, "features for evaluation");
  const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
  const usersCollectionRef_eval = collection(Db, "evaluation data");
  const usersCollectionRef_CurrSur = collection(Db, current_survey);
  const usersCollectionRef_survey = collection(Db, "surveys");

  const Submit = async () => {
    alert("Submit!");
    console.log(points.pointsdata)
    for (const row in points.pointsdata) {
      // console.log(`${points.pointsdata[row]}`);
      try {
        const docRef = await addDoc(usersCollectionRef_CurrSur, points.pointsdata[row]);
        console.log("Document written with ID: ", docRef.id);

      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const NextPage = () => {
    setPage(currPage => currPage + 1);
  };
  const PrevPage = () => {
    setPage(currPage => currPage - 1);
  };

  useEffect(() => {
    const getSurvey = async () => {
      const data = await getDocs(usersCollectionRef_survey);
      console.log(data.docs);
      setSurvey(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getSurvey();
  }, []);

  useEffect(() => {
    const getFeatures = async () => {
      const data = await getDocs(usersCollectionRef_features);
      console.log(data.docs);
      setFeatures(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFeatures();
  }, []);

  useEffect(() => {
    const getPersons = async () => {
      const data = await getDocs(usersCollectionRef_persons);
      console.log(data.docs);
      setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPersons();
  }, [])

  return (
    <>
      <Typography variant="h5" gutterBottom component="div">
        Survey {current_survey}
        <br/>
        Evaluate All the given users in the following Features Step By Step
      </Typography>

      {features.length > 0 ?
       features.map((x) => {
         return (
          <li>{x.feature} {x.total_score}</li>,
          <UnitStepForm 
            personsList={ persons }
            featureName={x.feature} 
            scores={x.total_score} 
            featureId={x.id} 
          />
          )
       }) 
       : 'Loading'}

      {/* <Container style={{padding: "10px", margin: "10px auto", width: "50%"}}>
        { page > 1 && <button onClick={PrevPage}>Previous</button>}
        &nbsp; Current Page is: { page } &nbsp;
        { page < (features.length - 1) ? <button onClick={NextPage}>Next</button> : <button onClick={Submit}>Submit</button>}
      </Container> */}

      <button onClick={Submit}>Submit</button>
    </>
  );
}

function MultiStepFormCtx() {
  return (
    <DBContextProvider> 
      <PointsCtxProvider>
        <MultiStep/>
      </PointsCtxProvider>   
    </DBContextProvider>
  );
}

export default MultiStepFormCtx;
