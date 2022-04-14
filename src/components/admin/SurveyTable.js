import { Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useContext } from "react";
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
    const CurrentSurvey = useContext(SurveyCTx);
    // const currentSurvey = CurrentSurvey.survey['name'];
    console.log(CurrentSurvey)
    const HandleClick = (x) => {
        console.log(x)
        console.log("NOw the Cur Survey is: ")
        console.log(CurrentSurvey.survey)
        // console.log(typeof(CurrentSurvey.survey))
        // console.log(typeof(x))
        // CurrentSurvey.setSurvey({0:CurrentSurvey.survey})
  
    }     
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