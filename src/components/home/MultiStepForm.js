import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import UnitStepForm from "./UnitStepForm";
import { Typography, Container } from '@mui/material';
import { DBContext } from "../../providers/dbcontext";
import { DBContextProvider } from "../../providers/dbprovider";
import { PointsCtx } from "../../providers/pointsctx";
import { PointsCtxProvider } from "../../providers/pointsProvider";

function MultiStep() {
  const [features, setFeatures] = useState([]);
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1)
  const {formdata, setFormData} = useContext(DBContext);
  const usersCollectionRef_features = collection(Db, "features for evaluation");
  const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
  const points = useContext(PointsCtx)
  const newtest1 = {...points.pointsdata};

  const NextPage = () => {
    setPage(currPage => currPage + 1);
  };
  const PrevPage = () => {
    setPage(currPage => currPage - 1);
  };
  const Submit = () => {
    alert("Submit!");
  };

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

  console.log(`Here is the Details................................`);
  let keyName2 = features[page].feature;
  console.log(features[page].feature);
  newtest1[keyName2] = [];
  // newtest1[keyName2] = [];
  console.log(newtest1);

  return (
    <>
      <Typography variant="p" gutterBottom component="div">
        <p>
          {formdata.map(d => {
            return(
              <span>&nbsp;{d.being_eval}&nbsp;</span>
            )
          })}
        </p>
        Features
      </Typography>

      {features.length > 0 && 
      <UnitStepForm 
        personsList={ persons }
        featureName={features[page].feature} 
        scores={features[page].total_score} 
        featureId={features[page].id} 
      /> }

      <Container style={{padding: "10px", margin: "10px auto", width: "50%"}}>
        { page > 1 && <button onClick={PrevPage}>Previous</button>}
        &nbsp; Current Page is: { page } &nbsp;
        { page < (features.length - 1) ? <button onClick={NextPage}>Next</button> : <button onClick={Submit}>Submit</button>}
      </Container>

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
