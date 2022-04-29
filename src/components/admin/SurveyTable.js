import { useState, useContext, useEffect } from "react";
import {SurveyCTx} from "../../providers/surveyctx";
import "../../styles/table.css";
import { doc, updateDoc } from "firebase/firestore";
import { Db } from "../../firebase-config/db";
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';

const SurveyTable = (props) => { 
    const CurrentSurvey = useContext(SurveyCTx);
    const HandleClick = (x) => {
        CurrentSurvey.setSurvey([x])
        console.log("Now the Cur Survey is: ")
        console.log(CurrentSurvey.survey[0]['name'])
    }

    const toggleSurveyStatus = async (survName, currStatus) => {
        const toggleRef = doc(Db, "surveys", survName);
        await updateDoc(toggleRef, {
            active: !currStatus
        });
    }

    return (
        <div style={{"overflow-x":"auto" }}>
            <h1>Name: {CurrentSurvey.survey[0]['name']} <br/>Id: {CurrentSurvey.survey[0]['id']}</h1>
            <table style={{border: "1px solid black", width: "100%"}}>
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
                        <tr style={{cursor:"alias"}} key={prsn.id}>
                            <td>{prsn.name}</td>
                            <td>{prsn.active?"Yes":"No"}</td>
                            <td onClick={()=>{toggleSurveyStatus(prsn.id, prsn.active)}}>Change the Status <SwitchAccessShortcutIcon /></td>
                            <td onClick={()=>{HandleClick(prsn)}}>Select This Survey</td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default SurveyTable;