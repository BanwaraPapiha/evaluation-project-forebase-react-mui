import React, { useContext, useState } from "react";
import { StepsData } from "../providers/stepsdata"

const Test = (props) => {
    const hookthevalue = useContext(StepsData);

    const [formdata, setFormData] = useState([
        {
            points: 200, 
            evaluator: "Me", 
            being_eval: "You",
            feature: "Truthfulness"
        },
        {
            points: 200, 
            evaluator: "Me1", 
            being_eval: "You1",
            feature: "Truthfulness1"
        },
        {
            points: 200, 
            evaluator: "Me2", 
            being_eval: "You2",
            feature: "Truthfulness2"
        },

    ]);
    return(
        <>
        {/* <StepsData.Consumer> */}
        "HELLO"
        {formdata.map(m => {
            return(
                <li>{m.evaluator}</li>    
            )
        })}
        <div>{hookthevalue.user}</div>
        {/* </StepsData.Consumer> */}
        </>
    );
}

export default Test;
