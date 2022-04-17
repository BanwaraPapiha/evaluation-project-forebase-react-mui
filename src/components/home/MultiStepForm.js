import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, MobileStepper } from '@mui/material';
import { DBContextProvider } from "../../providers/dbprovider";
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";
import { SurveyCTx } from "../../providers/surveyctx";

function MultiStep() {
  const [features, setFeatures] = useState([]);
  const [persons, setPersons] = useState([]);
  const [survUser, setSurvUser] = useState([]);
  const [survFeature, setSurvFeature] = useState([]);
  const [page, setPage] = useState(1)

  const points = useContext(PointsCtx)
  const surveyCtx = useContext(SurveyCTx)
  const current_survey = surveyCtx.survey[0]['id']

  const usersCollectionRef_features = collection(Db, "features for evaluation");
  const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

  const Submit = async () => {
    alert("Submit!");
    console.log(points.pointsdata)

    const docRef = await setDoc(doc(Db, "NewEvalData", current_survey), points.pointsdata);
    // console.log("Document written with ID: ", docRef.id);
    
    // for (const row in points.pointsdata) {
    //   // console.log(`${points.pointsdata[row]}`);
    //   try {
    //     // console.log(typeof(points.pointsdata))
    //     // const docRef = await addDoc(usersCollectionRef_CurrSur, points.pointsdata[row]);
    //     // console.log("Document written with ID: ", docRef.id);

    //   } catch (e) {
    //     console.error("Error adding document: ", e);
    //   }
    // }
  };
  const NextPage = () => {
    setPage(currPage => currPage + 1);
  };
  const PrevPage = () => {
    setPage(currPage => currPage - 1);
  };

  useEffect(() => {
    const getSurveyFeatures = async () => {
      const docRef = doc(Db, "surveys", "Work Survey April 2022");
      const docSnap = await getDoc(docRef);
      console.log(docSnap.data().users);
      // console.log(docSnap.data().features);
      setSurvUser(docSnap.data().users);
      setSurvFeature(docSnap.data().features)
    };
    getSurveyFeatures();
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
      {/* <div>
        Users of Survey: {survUser.length}
        {survUser.length>0 ?
        survUser.map((su)=>{
          return (
            <li>{String(su)}</li>
          )
        }):
        "NO SUccess"}
      </div>

      <div>
        Feature of Survey: {survFeature.length}
        {survFeature.length>0 ?
        survFeature.map((su)=>{
          return (
            <li>{String(su)}</li>
          )
        }):
        "NO SUccess"}
      </div> */}

      <Typography variant="h5" gutterBottom component="div">
        Survey {current_survey}<br/>
        Evaluate All the given users in the following Features Step By Step
        <MobileStepper variant="dots" steps={6} position="static" activeStep={1} sx={{ maxWidth: 400, flexGrow: 1 }}/>
      </Typography>

      {survFeature.length > 0 ?
       survFeature.map((x) => {
         return (
          <UnitStepForm 
            personsList={ survUser } featureName={JSON.parse(x).feature} 
            scores={JSON.parse(x).total_score} featureId={JSON.parse(x).id} />
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
