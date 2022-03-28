import { useState, useEffect } from "react";
import { Db } from "../../firebase-config/db";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Only_Table from '../common/onlyTable';

import {
  collection,
  getDocs,
  // addDoc,
  // updateDoc,
  // deleteDoc,
  // doc,
} from "firebase/firestore";

function Charts() {
    const [features, setFeatures] = useState([]);
    const [persons, setPersons] = useState([]);
    const [eval_data, setEval_data] = useState([]);
    const usersCollectionRef_features = collection(Db, "features for evaluation");
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");
    const usersCollectionRef_eval_data = collection(Db, "evaluation data");
  
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
      }, []);
    
      useEffect(() => {
        const getEvaluationData = async () => {
          const data = await getDocs(usersCollectionRef_eval_data);
          console.log("check");
          console.log(data.docs);
          setEval_data(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getEvaluationData();
      }, []);
    
      return (
        <div>
            Charts <br/>
            visible to admin only for each username <br/>
            shows record of what other users have evaluated a specific username <br/>
            ac/de-celerate <br/>

            <Only_Table table_datum={persons}/> 

            <div>
              <LineChart width={600} height={300} data={persons} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="acc_dec_score" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="Name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>
            <div>
                <h1>Evaluation Data</h1>
                {eval_data.map((ed) => {
                return (
                    <div>
                        <h5>
                        id: {ed.id}
                        | being_evaluated: {ed.being_evaluated} 
                        | evaluator: {ed.evaluator}
                        | feature: {ed.feature}
                        | score_awarded: {ed.score_awarded}
                        | total_score: {ed.total_score}
                        </h5>
                    </div>
                );
                })}
            </div>

            <div>
              <LineChart width={600} height={300} data={eval_data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="score_awarded" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="feature" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </div>

            <div>
                <h1>Features</h1>
                {features.map((fetr) => {
                  return (
                      <div>
                        {" "}
                        <h5>id: {fetr.id}</h5>
                        <h5>feature: {fetr.feature}</h5>
                        <h5>total_score: {fetr.total_score}</h5>
                      </div>
                  );
                })}
            </div>
        </div>
    );
  }
export default Charts;