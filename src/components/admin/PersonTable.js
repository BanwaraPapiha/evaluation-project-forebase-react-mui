import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { useState } from "react";
import { Link } from '@mui/material';
import firebase from 'firebase/compat/app';

const Added = (props) => {
    const [added, setAdded] = useState(false)
    const taskDocRef = doc(Db, "surveys", "Jan 22")
    const HandleAdd = () => {
        if (Added) {
            alert(added)
            setAdded(!added)
        }
        else if (!added) {
            alert(added)
            setAdded(!added)
            const add = async () => {
                try {
                    await updateDoc(taskDocRef, {
                        "users": arrayUnion("greater_virginia")
                    });
                    console.log("trying")
                }
                catch(err){
                    console.log(err);
                }
            }
            add()
            
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
                <td>{prsn.id?<Added/>:""}</td>
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