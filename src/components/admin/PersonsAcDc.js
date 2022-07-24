import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { SurveyCTx } from "../../providers/surveyctx";

const PersonAcDc = (props) => {
    const [persons, setPersons] = useState([]);
    const [cats, setCats] = useState([]);
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    const SurveyDocRef = doc(Db, "surveys", Curr_survey)

    useEffect(()=>{
        const unsub = onSnapshot(SurveyDocRef, (doc) => {
            console.log("Current data: ", doc.data());
            doc.data() && doc.data().users!=='undefined'?setPersons(doc.data().users):setPersons([])
            doc.data() && doc.data().cats!=='undefined'?setCats(doc.data().cats):setCats([])
        });
    }, [])

    return (
        <div>
            <table style={{"width": "100%"}}>
                <thead>
                    <tr>
                        <th>Users</th>
                        {
                            cats && cats.length>0
                            ?
                            cats.map((p)=>{
                                return (
                                    <th key={p}>
                                        {p}
                                    </th>
                                )
                            })
                            :
                            'Not Loaded'
                        }

                    </tr>
                </thead>
                <tbody>
                {
                persons && persons.length>0
                ?
                <>
                {
                    persons.map((p)=>{
                        return (
                            <tr key={p}>
                                <td>{p}</td>
                                <td>1</td>
                                <td>1</td>
                                <td>1</td>
                            </tr>
                        )
                    })
                }
                </>
                :
                'Not Loaded'
            }

                </tbody>
            </table>

        </div>
    )
}

export default PersonAcDc;