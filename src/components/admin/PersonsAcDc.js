import { Db } from "../../firebase-config/db";
import { doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { SurveyCTx } from "../../providers/surveyctx";
import Button from '@mui/material/Button';
import { jsonEval } from "@firebase/util";

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

    const [adminScore, setAdminScore] = useState({})
    const [dScore, setDScore] = useState({})

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
                        <th>Sum</th>

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
                                <td><AcDcTool email={p} cat={'cat 1'} adminScore={adminScore} setAdminScore={setAdminScore} /></td>
                                <td><AcDcTool email={p} cat={'cat 2'} adminScore={adminScore} setAdminScore={setAdminScore} /></td>
                                <td><AcDcTool email={p} cat={'cat 3'} adminScore={adminScore} setAdminScore={setAdminScore} /></td>
                                {/* <td><Finalizer email={p} cat={'cat 3'} adminScore={adminScore} setAdminScore={setAdminScore} dScore={dScore} setDScore={setDScore} /></td> */}
                            </tr>
                        )
                    })
                }
                </>
                :
                'Not Loaded'
            }

                </tbody>

                <Button onClick={()=>{console.log(adminScore)}}>Show in Log</Button>
            </table>

        </div>
    )
}

export default PersonAcDc;

const AcDcTool = (props) => {
    const [numVal, setNumVal] = useState(1)
    const email = props.email
    const cat = props.cat
    var obj = props.adminScore

    useEffect(()=>{
        let hasKey = obj.hasOwnProperty(email); 

        if (hasKey) {
            console.log('This key exists.');
            obj[email][cat] = numVal
        } else {
            console.log('This key does not exist.');
            obj[email] = {}
            obj[email][cat] = numVal
        }
        props.setAdminScore(obj)

        console.log(obj)

    }, [numVal])

    return (
        <div>
            {/* <div>email: {email}</div> */}
            {/* <div>cat: {cat}</div> */}
            {/* <div>{email}: {cat}</div> */}
            {/* <div>obj: {JSON.stringify(obj)}</div> */}
            <input type='number' value={numVal} pattern="/^[0-9]+$/" required
            onChange={(e)=>{
                setNumVal(e.target.value);                
            }}
            />
            {
                // console.log('comp data' + String(email) + JSON.stringify({...obj[email]}))
                console.log(String(email) + JSON.stringify({...obj[email]}))
            }
        </div>
    )
}

const Finalizer = (props) => {
    const adminScore = props.adminScore
    const email = props.email
    const reducer = (accumulator, curr) => accumulator + curr
    // dScore, setDScore
    const obj2 = props.dScore

    useEffect(()=>{
        obj2[email] = Object.values(adminScore[email]).reduce(reducer)
        props.setDScore(obj2)

        // console.log(obj2)
    }, [])

    return (
        <div>
            {String((Object.values(adminScore[email]).reduce(reducer)))}
        </div>
    )
}
// {
//     email1: {
//         'cat1': 2,
//         'cat2': 4,
//         'cat3': 8,
//     }
// }
