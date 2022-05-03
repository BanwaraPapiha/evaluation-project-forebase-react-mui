import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";
import FeatureScore from "./FeatureScore";

function FeatureScoresTable() {
    const [addedFeatures, setFeaturesUsers] = useState([]);
    const surveyCtx = useContext(SurveyCTx)

    useEffect(() => {
      const unsub = onSnapshot(doc(Db, "surveys", surveyCtx.survey[0]['id']), (doc) => {

        if (doc.exists()){
          console.log('doc exists')
          if(Object.keys(doc.data()).includes("features")){
            console.log("features field exists");
            const featuresHere = doc.data().features;
            console.log(typeof(doc.data().features));
            setFeaturesUsers(featuresHere)  
          } else {
            console.log("no key found")
            const featuresHere = ["No Existing Data, create New"];
            setFeaturesUsers(featuresHere)
          }          
        }
    });
    }, [])

    return (
        <div>
            <table style={{"width": "100%"}}>
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Scores</th>
                </tr>
              </thead>
              <tbody>
                {addedFeatures.map((tro)=>{
                  return (
                    addedFeatures.length > 0?
                    <tr>
                      <td>{tro}</td>
                      <td>
                        Scores: 
                        <FeatureScore feature_id={tro}/>
                      </td>
                    </tr>:
                    <div>No data Found</div>
                  )
                })}
              </tbody>
            </table>
        </div>
    );
  }
  
  export default FeatureScoresTable;
  