import { Stack } from '@mui/material';
import { PinDropSharp } from "@material-ui/icons";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useContext } from "react";
import {SurveyCTx} from "../../providers/surveyctx";

const Selected = (props) => {
    const CurrentSurvey = useContext(SurveyCTx);
    const [selected, setSelected] = useState(false)
    const HandleSelect = () => {
        CurrentSurvey.setSurvey(props.sy)
        if (CurrentSurvey.survey.length === 1 && CurrentSurvey.survey[0] === props.sy) {
            setSelected(!selected)
            style = "{color: 'green'}"
            console.log(CurrentSurvey.survey)
        }
        setSelected(!selected)
        // console.log(CurrentSurvey.survey)
        console.log(CurrentSurvey)
    }

    return(
        <td onClick={()=>HandleSelect()}>{selected? <CheckBoxIcon style={style}/>:<CheckBoxIcon />}</td>
    )
}

const SurveyTable = (props) => {      
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

        {/* <Stack spacing={2}> */}
        {props.body.map((prsn) => {
          return (
              <tr> 
              <td>{prsn.id} </td>
              <td>{prsn.name}</td>
              <td>{prsn.startDate}</td>
              <td>{prsn.endDate}</td>
              <td>{prsn.active}</td>
              <td>{prsn.usersInSurvey}</td>
              <td><Selected sy={prsn} /></td>
            </tr>
          );
        })}
        {/* </Stack> */}

            </tbody>
        </table>
    )
}

export default SurveyTable;