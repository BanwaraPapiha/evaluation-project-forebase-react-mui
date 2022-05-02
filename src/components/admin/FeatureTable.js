import { useState, useEffect, useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { Link, TextField } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";
import "../../styles/table.css";

const Added = (props) => {
  const [added, setAdded] = useState(false)
  const surveyCtx = useContext(SurveyCTx)
  const Curr_survey = surveyCtx.survey[0]['id']
  const taskDocRef = doc(Db, "surveys", Curr_survey)
  const [score_value, setScore_value] = useState(1);

  const checkState = async (qfeature) => {
    const unsub = onSnapshot(taskDocRef, (doc) => {
      if (doc.data().features.includes(qfeature)) {
        console.log("Found in Array")
        setAdded(true)
      }
  });
  checkState(props.featureDetail.feature)
  }

  async function Remove2Array(user2Add) {
    const result = await updateDoc(taskDocRef, {
        features: arrayRemove(String(user2Add))
    });
  }
  async function Add2Array(user2Add) {
      // const result = await updateDoc(taskDocRef, {
      //   features: arrayUnion(String(user2Add))
      // });
      // alert({user2Add: 30})
  }

  const HandleAdd = () => {
    alert()
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
    alert(`You are going to delete? ${feature}`)
    // const taskDocRef = doc(Db, "features for evaluation", id)
    const taskDocRef = doc(Db, "all_features", id)
    try{
      await deleteDoc(taskDocRef)
      props.setFeatures(props.features.filter(item => item.feature !== feature));
    } catch (err) {
      alert(err)
    }
  }

  return(
    <>
      {/* <td>{prsn.id} </td> */}
      <td>{props.prsn.feature}</td>
      <td>{props.prsn.id?<input onChange={event => setScore_value(event.target.value)} value={score_value} type="number" id="quantity" name="quantity" min="1" />:""}</td>
      <td>{props.prsn.id?<div onClick={()=>HandleAdd()}>{added? <CheckCircleRoundedIcon style={{color: 'green'}}/>:<AddCircleIcon />}</div>:""}</td>
      <td>{props.prsn.id?<DeleteIcon onClick={()=>handleDelete(props.prsn.id, props.prsn.feature)}/>:<Link href="#FeatureAddOnlyForm">No Matches. Create New Feature?</Link>}</td>
    </>
      
  )
}

const FeatureTable = (props) => {     
    const [features, setFeatures] = useState([]);
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const SurveyDocRef = doc(Db, "surveys", Curr_survey)

    // async function Remove2Array(user2Add) {
    //   console.log(Curr_survey);
    //   const result = await updateDoc(SurveyDocRef, {
    //       features: arrayRemove(String(user2Add))
    //     });
    // }

    // const handleDelete = async (id, feature) => {
    //     Remove2Array(feature)
    //     alert(`You are going to delete? ${feature}`)
    //     // const taskDocRef = doc(Db, "features for evaluation", id)
    //     const taskDocRef = doc(Db, "all_features", id)
    //     try{
    //       await deleteDoc(taskDocRef)
    //       setFeatures(features.filter(item => item.feature !== feature));
    //     } catch (err) {
    //       alert(err)
    //     }
    // }

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
              <Added featureDetail={prsn} />
              {/*  
               <td>{prsn.id} </td>
               <td>{prsn.feature}</td>
               <td>{prsn.id?<input type="number" id="quantity" name="quantity" min="1" />:""}</td>
               <td>{prsn.id?<Added featureDetail={prsn}/>:""}</td>
               <td>{prsn.id?<DeleteIcon onClick={()=>handleDelete(prsn.id, prsn.feature)}/>:<Link href="#FeatureAddOnlyForm">No Matches. Create New Feature?</Link>}</td> 
              */}
            </tr>
          );
        })}
            </tbody>
        </table>
    )
}

export default FeatureTable;