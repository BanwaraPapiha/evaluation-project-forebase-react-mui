import { useState, useEffect, useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot, setDoc } from "firebase/firestore";
import { Link, TextField } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";
import "../../styles/table.css";

const Added = (props) => {
  const [added, setAdded] = useState(false)
  const surveyCtx = useContext(SurveyCTx)
  const Curr_survey = surveyCtx.survey[0]['id']
  const taskDocRef = doc(Db, "surveys", Curr_survey)
  const [score_value, setScore_value] = useState(1);

  useEffect(()=>{
    const checkState = async (qfeature) => {
      const unsub = onSnapshot(taskDocRef, (doc) => {
        if (doc.data().features.includes(qfeature)) {
          console.log("Found in Array")
          setAdded(true)
        }
        else {
          setAdded(false)
        }
    });
    }
    checkState(props.featureDetail.feature)  
  }, [])

  async function Remove2Array(user2Add) {
    const result = await updateDoc(taskDocRef, {
        features: arrayRemove(String(user2Add))
    });
  }
  async function Add2Array(user2Add) {
      const result = await updateDoc(taskDocRef, {
        features: arrayUnion(String(user2Add))
      });
      console.log({user2Add: 30})
      const createFeature = async () => {
        await setDoc(doc(Db, "all_features", String(user2Add)), 
        {[Curr_survey]: score_value}, { merge: true });
      };
      createFeature()
  }

  const HandleAdd = () => {
    if (added) {
      setAdded(!added)
      Remove2Array(props.featureDetail.feature);
    }
    else if (!added) {
      setAdded(!added)
      Add2Array(props.featureDetail.feature);
    }            
  }

  const handleDelete = async (id, feature) => {
    Remove2Array(feature)
    // alert(`${feature} is being deleted`)
    const taskDocRef = doc(Db, "all_features", id)
    try{
      await deleteDoc(taskDocRef)
      props.setFeatures(props.features.filter(item => item.feature !== feature));
    } catch (err) {
      console.log(err)
    }
  }

  return(
    <>
      {/* <td>{prsn.id} </td> */}
      <td>{String(props.prsn.feature)}</td>
      <td>{props.prsn.id?<input onChange={event => setScore_value(event.target.value)} value={score_value} type="number" id="quantity" name="quantity" min="1" />:""}</td>
      <td>{props.prsn.id?<div onClick={()=>HandleAdd()}>{added? <CheckCircleRoundedIcon style={{color: 'green'}}/>:<AddCircleIcon />}</div>:""}</td>
      <td>{props.prsn.id?<DeleteIcon style={{color:"rgb(235, 0, 20)"}} onClick={()=>handleDelete(props.prsn.id, props.prsn.feature)}/>:<Link href="#FeatureAddOnlyForm">No Matches. Create New Feature?</Link>}</td>
    </>
  )
}

const FeatureTable = (props) => {     
    const [features, setFeatures] = useState([]);
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const SurveyDocRef = doc(Db, "surveys", Curr_survey)

    return (
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    {props.title.map(t=>{
                        return(
                            <th>{t}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>

        {props.body.map((prsn) => {
          return (
            <tr>
              <Added featureDetail={prsn} prsn={prsn} />
            </tr>
          );
        })}
            </tbody>
        </table>
    )
}

export default FeatureTable;