import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { Link } from '@mui/material';
import firebase from 'firebase/compat/app';
import { SurveyCTx } from "../../providers/surveyctx";

const Added = (props) => {
    const [added, setAdded] = useState(false)
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const taskDocRef = doc(Db, "surveys", Curr_survey)

    // async function Remove2Array(user2Add) {
    //     console.log(Curr_survey);
    //     const result = await updateDoc(taskDocRef, {
    //         name: "April 24, 2023",
    //         // users: arrayRemove(String(user2Add))
    //       });
    //   }
    
    async function Add2Array(user2Add) {
        console.log(Curr_survey);
        const result = await updateDoc(taskDocRef, {
            name: "April 24, 2023",
            users: arrayUnion(String(user2Add))
            });
    }

    const HandleAdd = () => {
        if (Added) {
            console.log(added)
            console.log('no action ')
            setAdded(!added)
            // Remove2Array(props.userDetail.Name);
            // Add2Array(props.userDetail.Name);
        }
        else if (!added) {
            console.log(added)
            console.log('action ')
            setAdded(!added)
            Add2Array(props.userDetail.Name);
            }            
        }

    return(
        <td onClick={()=>HandleAdd()}>{added? <CheckCircleRoundedIcon style={{color: 'green'}}/>:<AddCircleIcon />}</td>
    )
}

const PersonTable = (props) => {
    const [persons, setPersons] = useState([]);
    const handleDelete = async (id, person) => {
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
        <div style={{"overflow-x":"auto"}}>
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
                <td>{prsn.id}</td>
                <td>{prsn.Name}</td>
                <td>{prsn.Email}</td>
                <td>{prsn.id?<Added userDetail={prsn}/>:""}</td>
                <td>{prsn.id?<DeleteIcon onClick={()=>handleDelete(prsn.id, prsn.Name)}/>:<Link href="#PersonAddOnlyForm">No Matches. Create New Person?</Link>}</td>
                </tr>
            );
            })}
        </tbody>
        </table>

        </div>
    )
}


export default PersonTable;