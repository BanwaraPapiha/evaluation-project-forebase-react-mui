import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useContext, useEffect } from "react";
import {SurveyCTx} from "../../providers/surveyctx";

const Selected = (props) => {
    const [selected, setSelected] = useState(false);
    let style = {color: 'black'};
    const HandleSelect = () => {}
    return(
        <div onClick={()=>HandleSelect()}>{selected? <CheckBoxIcon style={style}/>:<CheckBoxIcon />}</div>
    )
}

const SurveyTable = (props) => { 
    const [xy, setXy] = useState();
    const CurrentSurvey = useContext(SurveyCTx);
    const HandleClick = (x) => {
        CurrentSurvey.setSurvey([x])
        console.log("Now the Cur Survey is: ")
        console.log(CurrentSurvey.survey[0]["id"])
    }     
    
    return (
        <div style={{"overflow-x":"auto"}}>
            <h1>Name: {JSON.stringify(CurrentSurvey.survey[0]['name'])}, Id: {JSON.stringify(CurrentSurvey.survey[0]['id'])}</h1>
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
              <td onClick={()=>{HandleClick(prsn)}}>{prsn.id} Click Here</td>
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