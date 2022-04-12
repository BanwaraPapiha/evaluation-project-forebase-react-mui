import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useContext } from "react";
import {SurveyCTx} from "../../providers/surveyctx";

const Selected = (props) => {
    const CurrentSurvey = useContext(SurveyCTx);
    const [selected, setSelected] = useState(false)
    let style = {color: 'black'}
    const HandleSelect = () => {
        // BUGGY FX
        CurrentSurvey.setSurvey(props.sy)
        if (CurrentSurvey.survey.length === 1 && CurrentSurvey.survey[0]['id'] === props.sy['id']) {
            setSelected(!selected)
            style = {color: 'green'}
        }
        else {
            style = {color: 'black'}
        }
        console.log(CurrentSurvey.survey[0])
        console.log(props.sy)

    }

    return(
        <div onClick={()=>HandleSelect()}>{selected? <CheckBoxIcon style={style}/>:<CheckBoxIcon />}</div>
    )
}

const SurveyTable = (props) => {      
    return (
        <div style={{"overflow-x":"auto"}}>
        <table style={{width: "100%"}}>
            <thead>
                <tr>
                    {props.title.map(t=>{
                        return(
                            <th key={t}>{t}</th>
                        )
                    })}
                </tr>
            </thead>
            <tbody>

        {props.body.map((prsn) => {
          return (
            <tr key={prsn.id}> 
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

            </tbody>
        </table>

        </div>
    )
}

export default SurveyTable;