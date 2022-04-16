import { useState, useEffect, useContext } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Link } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";

const Added = (props) => {
  const [added, setAdded] = useState(false)
  const surveyCtx = useContext(SurveyCTx)
  const Curr_survey = surveyCtx.survey[0]['id']
  const taskDocRef = doc(Db, "surveys", Curr_survey)

  async function Remove2Array(user2Add) {
    console.log(Curr_survey);
    const result = await updateDoc(taskDocRef, {
        features: arrayRemove(String(user2Add))
      });
  }

  async function Add2Array(user2Add) {
      console.log(Curr_survey);
      const result = await updateDoc(taskDocRef, {
        features: arrayUnion(String(user2Add))
          });
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
  return(
      <div onClick={()=>HandleAdd()}>{added? <CheckCircleRoundedIcon style={{color: 'green'}}/>:<AddCircleIcon />}</div>
  )
}

const FeatureTable = (props) => {     
    const [features, setFeatures] = useState([]);
    const handleDelete = async (id, feature) => {
        alert(`You are going to delete? ${feature}`)
        const taskDocRef = doc(Db, "features for evaluation", id)
        try{
          await deleteDoc(taskDocRef)
          setFeatures(features.filter(item => item.feature !== feature));
        } catch (err) {
          alert(err)
        }
      }
    return (
        <table>
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
              <td>{prsn.id} </td>
              <td>{prsn.feature}</td>
              <td>{prsn.total_score}</td>
              <td>{prsn.id?<Added featureDetail={prsn}/>:""}</td>
              <td>{prsn.id?<DeleteIcon onClick={()=>handleDelete(prsn.id, prsn.feature)}/>:<Link href="#FeatureAddOnlyForm">No Matches. Create New Feature?</Link>}</td>
            </tr>
          );
        })}
            </tbody>
        </table>
    )
}

export default FeatureTable;