import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { Db } from "../../firebase-config/db";
import { doc, deleteDoc} from "firebase/firestore";

const Added = (props) => {
  const [added, setAdded] = useState(false)
  const HandleAdd = () => setAdded(!added)
  return(
      <td onClick={()=>HandleAdd()}>{added? <CheckCircleRoundedIcon style={{color: 'green'}}/>:<AddCircleIcon />}</td>
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
              <td><Added/></td>
              <td onClick={()=>handleDelete(prsn.id, prsn.feature)}><DeleteIcon /></td>
            </tr>
          );
        })}
            </tbody>
        </table>
    )
}

export default FeatureTable;