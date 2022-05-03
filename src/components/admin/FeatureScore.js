import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";

const FeatureScore = (props) => {
    const [fet_scor, setFet_scor] = useState(0)
    const surveyCtx = useContext(SurveyCTx)
    const Curr_survey = surveyCtx.survey[0]['id']
    useEffect(()=>{
        const getScore = async () => {
            const docSnap = await getDoc(doc(Db, "all_features", props.feature_id));
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                console.log("Document data Curr_survey:", docSnap.data()[Curr_survey]);
                setFet_scor(Number(docSnap.data()[Curr_survey]))
            } else {
                console.log("No such document! about current survey feature value");
            }    
        }
        getScore();
    })
    return (
        <>
        {fet_scor}
        </>
    )
}

export default FeatureScore;