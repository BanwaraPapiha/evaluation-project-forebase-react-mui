import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState, useContext, useEffect } from "react";
import {SurveyCTx} from "../../providers/surveyctx";

const SurveyTable = (props) => { 
    const CurrentSurvey = useContext(SurveyCTx);
    const HandleClick = (x) => {
        CurrentSurvey.setSurvey([x])
        console.log("Now the Cur Survey is: ")
        console.log(CurrentSurvey.survey[0]['name'])
    }     
    
    return (
        <div style={{"overflow-x":"auto"}}>
            <h1>Name: {CurrentSurvey.survey[0]['name']} <br/>Id: {CurrentSurvey.survey[0]['id']}</h1>
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
                        <tr key={prsn.id} onClick={()=>{HandleClick(prsn)}}>
                        <td>{prsn.id}</td>
                        <td>{prsn.name}</td>
                        <td>{prsn.active}</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default SurveyTable;