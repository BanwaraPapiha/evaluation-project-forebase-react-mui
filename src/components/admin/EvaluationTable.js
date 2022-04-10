import { PinDropSharp } from "@material-ui/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { Stack } from '@mui/material';

const EvaluationTable = (props) => {      
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
              <td>{prsn.survey} </td>
              <td>{prsn.being_eval}</td>
              <td>{prsn.evaluator}</td>
              <td>{prsn.feature}</td>
              <td>{prsn.points}</td>
              <td><DeleteIcon /></td>
            </tr>
          );
        })}

            </tbody>
        </table>
    )
}

export default EvaluationTable;