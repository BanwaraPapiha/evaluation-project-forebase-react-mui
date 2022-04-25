import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { Link } from '@mui/material';
import { SurveyCTx } from "../../providers/surveyctx";
import {Remove2Array} from '../common/AddRemove';
import "../../styles/table.css";

const Added = (props) => {
    const [added, setAdded] = useState(false)
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const taskDocRef = doc(Db, "surveys", Curr_survey)

    const checkState = async (qfeature) => {
        const unsub = onSnapshot(taskDocRef, (doc) => {
        //   console.log("Current data: ", doc.data().users);
          if (doc.data().users.includes(qfeature)) {
            console.log("Found in Array")
            setAdded(true)
          }
      });
    }
    checkState(props.userDetail.Email)

    async function Remove2Array(user2Add) {
        const result = await updateDoc(taskDocRef, {
            users: arrayRemove(String(user2Add))
        });
    }
    
    async function Add2Array(user2Add) {
        const result = await updateDoc(taskDocRef, {
            users: arrayUnion(String(user2Add))
        });
    }

    const HandleAdd = () => {
        if (added) {
            setAdded(!added)
            Remove2Array(props.userDetail.Email);
        }
        else if (!added) {
            setAdded(!added)
            Add2Array(props.userDetail.Email);
            }            
        }

    return(
        <div onClick={()=>HandleAdd()}>{added? <CheckCircleRoundedIcon style={{color: 'green'}}/>:<AddCircleIcon />}</div>
    )
}

const PersonTable = (props) => {
    const [persons, setPersons] = useState([]);
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const SurveyDocRef = doc(Db, "surveys", Curr_survey)

    const handleDelete = async (id, person) => {
        Remove2Array(SurveyDocRef, person)
        alert(`You are going to delete? ${person}`)
        const taskDocRef = doc(Db, "persons to be evaluated", id)
        try{
          await deleteDoc(taskDocRef)
          setPersons(persons.filter(item => item.person !== person));
        } catch (err) {
          alert(err)
        }
    }

    return (
        <table style={{"width": "100%"}}>
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
                {/* <td>{prsn.id}</td> */}
                <td>{prsn.Name}</td>
                <td>{prsn.Email}</td>
                <td>{prsn.id?<Added userDetail={prsn}/>:""}</td>
                <td>{prsn.id?<DeleteIcon onClick={()=>handleDelete(prsn.id, prsn.Name)}/>:<Link href="#PersonAddOnlyForm">No Matches. Create New Person?</Link>}</td>
                </tr>
            );
            })}
        </tbody>
        </table>
    )
}


export default PersonTable;