import { useState, useEffect, useContext } from "react";
// import { Db } from "../firebase-config/db";
// import { collection, getDocs } from "firebase/firestore";
import { PointsCtx } from "./pointsctx"

export function PointsCtxProvider(props) {
  // const [features, setFeatures] = useState([]);
  // const [persons, setPersons] = useState([]);
  // const usersCollectionRef_features = collection(Db, "features for evaluation");
  // const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

  // useEffect(() => {
  //   const getFeatures = async () => {
  //     const data = await getDocs(usersCollectionRef_features);
  //     console.log(data.docs);
  //     setFeatures(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getFeatures();
  // }, []);

  // useEffect(() => {
  //   const getPersons = async () => {
  //     const data = await getDocs(usersCollectionRef_persons);
  //     console.log(data.docs);
  //     setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };
  //   getPersons();
  // }, [])

  let initial ={};
  const [pointsdata, setPointsdata] = useState(initial);

  return (
      <PointsCtx.Provider value={{pointsdata, setPointsdata}}>
        {props.children}
      </PointsCtx.Provider>
    );
  }
