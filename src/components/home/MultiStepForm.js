import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import UnitStepForm from "./UnitStepForm";
import { collection, getDocs } from "firebase/firestore";
import Typography from '@mui/material/Typography';
import { StepsData } from "../../providers/stepsdata";

function MultiStepForm() {
  const [features, setFeatures] = useState([]);
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1)
  
  const stepData = useContext(StepsData);

  const NextPage = () => {
    setPage(currPage => currPage + 1);
  };
  const PrevPage = () => {
    setPage(currPage => currPage - 1);
  };
  const Submit = () => {
    alert("Submit!");
  };

  const usersCollectionRef_features = collection(Db, "features for evaluation");
  const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

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
    <div>      
      <Typography variant="p" gutterBottom component="div">
      Here it is new Context Type:  {typeof(stepData)},  <br />
      {/* Here it is new Context {stepData.user} <br /> */}
      
        {/* {stepData.map(d=>(
          <li>d.feature</li>
        ))} */}
        Features
      </Typography>

      {features.length > 0 && 
      <UnitStepForm featureName={ features[page].feature } scores={ features[page].total_score } featureId={ features[page].id } personsList={ persons }/> }
      { page > 1 && <button onClick={PrevPage}>Previous</button>}
        | Current Page is: { page } | 
        { page < (features.length - 1) ? <button onClick={NextPage}>Next</button> : <button onClick={Submit}>Submit</button>}

    </div>
  );
}

export default MultiStepForm;
