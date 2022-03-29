import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import UnitStepForm from "./UnitStepForm";
import { collection, getDocs } from "firebase/firestore";
import { Typography, Container } from '@mui/material';
import { DBContextProvider } from "../../providers/dbprovider";
import { DBContext } from "../../providers/dbcontext"

function MultiStep() {
  const [features, setFeatures] = useState([]);
  const [persons, setPersons] = useState([]);
  const [page, setPage] = useState(1)
  const {user, setUser, formdata, setFormData} = useContext(DBContext);
  const usersCollectionRef_features = collection(Db, "features for evaluation");
  const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

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

  console.log("this is special experiment for: ")
  console.log()

  return (
    <>
      <Typography variant="p" gutterBottom component="div">
        <h1>Hello, {typeof(user)}!</h1>
        {console.log(user)}
        {console.log(formdata)}
        <h1>Hello, {user}!</h1>
        Features
      </Typography>

      {features.length > 0 && 
      <UnitStepForm featureName={ features[page].feature } scores={ features[page].total_score } featureId={ features[page].id } personsList={ persons }/> }

      <Container style={{padding: "10px", margin: "auto 10px"}}>
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
      <MultiStep/>
    </DBContextProvider>
  );
}

export default MultiStepFormCtx;
