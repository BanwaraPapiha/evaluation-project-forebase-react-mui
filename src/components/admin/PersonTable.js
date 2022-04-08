import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useState } from "react";

const Added = (props) => {
    const [added, setAdded] = useState(false)
    const HandleAdd = () => setAdded(!added)
    return(
        <td onClick={()=>HandleAdd()}>{added? <CheckCircleRoundedIcon style={{color: 'green'}}/>:<AddCircleIcon />}</td>
    )
}

const PersonTable = (props) => {
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
              <td>{prsn.Name}</td>
              <td>{prsn.Email}</td>
              <td><Added/></td>
              <td><DeleteIcon /></td>
            </tr>
          );
        })}
            </tbody>
        </table>
    )
}

export default PersonTable;