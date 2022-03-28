import React, { useContext, useState } from "react";
import { DBContextProvider } from "../providers/dbprovider";

const Test = (props) => {
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
        <DBContextProvider/>
        "HELLO"
        {formdata.map(m => {
            return(
                <li>{m.evaluator}</li>    
            )
        })}
        <div>user</div>
        </>
    );
}

export default Test;
