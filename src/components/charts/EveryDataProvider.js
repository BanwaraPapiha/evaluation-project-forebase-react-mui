import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";
import AllDataTable from "./TableEveryData";
import { UserContext } from "../../providers/userCtx";

function AllData() {
    const [persons, setPersons] = useState([]);
    const [scoreData, setScoreData] = useState([]);
    const [sumData, setSumData] = useState([]);
    const [idSum, setIdSum] = useState([]);
    const UserCtx = useContext(UserContext)
    const Calc_Data = [];
    const Calc_Scor = {};
    const surveyCtx = useContext(SurveyCTx)
    const survey = surveyCtx.survey[0]['id']
    const usersCollectionRef_survey = collection(Db, survey);
    const usersCollectionRef_persons = collection(Db, "persons to be evaluated");

    useEffect(() => {
        const getPersons = async () => {
          const data = await getDocs(usersCollectionRef_persons);
          console.log(data.docs);
          setPersons(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPersons();
      }, []);

    useEffect(() => {
      const getData = async () => {
        const data = await getDocs(usersCollectionRef_survey);
        console.log(survey)
        console.log(data.docs);
        setScoreData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getData();
    }, []);

    useEffect(()=>{
      console.log("Strted\n")
      scoreData.map((x)=>{
        for (const [key, value] of Object.entries(x)) {
          var giver = x['id']
          if (key==='id') {console.log("This is id for ", value)}
          else {
            console.log("This is for ", key, " given by ", giver)
            for (const [key2, value2] of Object.entries(value)) {
              var summ = {evaluator: giver, being_eval: key2, feature: key, points: value2}
              console.log(summ)
              Calc_Data.push(summ)          
              typeof(Calc_Scor[[key2]])==="number"? Calc_Scor[[key2]] = Number(Calc_Scor[[key2]]) + Number(value2) : Calc_Scor[[key2]] =  Number(value2)
            }
          }
        } 
      })
      // console.log("length: ", Calc_Data.length)
      setSumData(Calc_Data)
      setIdSum(Calc_Scor)
      // console.log(idSum)

    }, [scoreData])

    return (
      <div>
        <AllDataTable title={["Being Evaluated", "Points", "Feature", "Evaluator"]} sumData={sumData} idSum={idSum}/>
      </div>
    );
  }
  
  export default AllData;
  