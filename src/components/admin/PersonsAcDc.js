import { Db } from "../../firebase-config/db";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { SurveyCTx } from "../../providers/surveyctx";
import Button from '@mui/material/Button';

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

    const submit = () => {
        try{
            const cityRef = doc(Db, 'surveys', Curr_survey);
            setDoc(cityRef, { usersdata: dScore }, { merge: true });
            console.log('done')
        }
        catch(err) {
            alert(err)
            console.log('err')
        }
    }
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
                                <td><Finalizer email={p} adminScore={adminScore} dScore={dScore} setDScore={setDScore} /></td>
                            </tr>
                        )
                    })
                }
                </>
                :
                'Not Loaded'
            }

                </tbody>

                <Button variant="contained" fullwidth sx={{ margin: 3}} onClick={()=>{alert();submit()}}>Submit in Log</Button>
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
            <input type='number' value={numVal} pattern="/^[0-9]+$/" required
            onChange={(e)=>{
                setNumVal(e.target.value);                
            }}
            />
        </div>
    )
}

const Finalizer = (props) => {
    const adminScore = props.adminScore
    const email = props.email
    const obj2 = props.dScore
    const [finalTot, setFinalTot] = useState(1)

    useEffect(()=>{
        console.log("Here problem occured if any")
        var Arr = Object.values(adminScore[email])
        var total = 0;
        for (var i = 0; i < Arr.length; i++)
        {
            total += Arr[i];
        }
        setFinalTot(total)

        // obj2[email] = total
        obj2[email] = finalTot

        props.setDScore(obj2)
    }, [adminScore, props.dScore])

    console.log('props.dScore')
    console.log(props.dScore)

    return (
        <div>
            Hello {finalTot && finalTot}
        </div>
    )
}
