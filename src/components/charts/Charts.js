import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";
import AllDataTable from "./TableEveryData";
import { Container, Typography } from '@mui/material';
import CanvasJSReact from '../../canvas_js/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Charts() {
    const [scoreData, setScoreData] = useState([]);
    const [sumData, setSumData] = useState([]);
    const [idSum, setIdSum] = useState([]);
    const Calc_Data = [];
    const Calc_Scor = {};
    const surveyCtx = useContext(SurveyCTx)
    const survey = surveyCtx.survey[0]['id']
    const usersCollectionRef_survey = collection(Db, survey);

    useEffect(() => {
      const getData = async () => {
        const data = await getDocs(usersCollectionRef_survey);
        console.log(survey)
        console.log(data.docs);
        setScoreData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      };
      getData();
    }, [survey]);

    useEffect(()=>{
      console.log("Strted\n")
      console.log(survey)
      scoreData.map((x)=>{
        for (const [key, value] of Object.entries(x)) {
          var giver = x['id']
          if (key==='id') {console.log("This is id for ", value)}
          else {
            console.log("This is for ", key, " given by ", giver)
            for (const [key2, value2] of Object.entries(value)) {
              var summ = {evaluator: giver, being_eval: key2, feature: key, points: value2}
              console.log(summ)
              Calc_Data.push(summ)          
              typeof(Calc_Scor[[key2]])==="number"? Calc_Scor[[key2]] = Number(Calc_Scor[[key2]]) + Number(value2) : Calc_Scor[[key2]] =  Number(value2)
            }
          }
        } 
      })
      // console.log("length: ", Calc_Data.length)
      setSumData(Calc_Data)
      setIdSum(Calc_Scor)
      // console.log(idSum)

    }, [scoreData, survey])
    //////////////
    const options = {
      exportEnabled: true,
      animationEnabled: true,
      title: {
        text: "Features Analysis"
      },
      data: [{
        type: "pie",
        startAngle: 75,
        toolTipContent: "<b>{label}</b>: {y}%",
        showInLegend: "true",
        legendText: "{label}",
        indexLabelFontSize: 16,
        indexLabel: "{label} - {y}%",
        // dataPoints: [
        //   { y: 18, label: "Direct" },
        //   { y: 49, label: "Organic Search" },
        //   { y: 9, label: "Paid Search" },
        //   { y: 5, label: "Referral" },
        //   { y: 19, label: "Social" }
        // ]

        dataPoints: [
          { y: 18, label: "Direct" },
          { y: 49, label: "Organic Search" },
          { y: 9, label: "Paid Search" },
          { y: 5, label: "Referral" },
          { y: 19, label: "Social" }
        ]

      }]
    }
    //////
    var tmp_arr = []
    var tmp_obj = {}
    sumData.map((u)=>{
      if (u.being_eval==="zainab3zain@love.com") {
        tmp_arr.push(u)
        console.log(u.feature + ": " + u.points)
        if (tmp_obj[[u.feature]]!=="undefined") {
          tmp_obj[[u.feature]] += u.points
        }
        else {
          tmp_obj[[u.feature]] = u.points
        }
        // tmp_obj[[u.feature]] += u.points
        // tmp_obj[[u.feature]] = typeof(u.feature==='undefined') ? 0 : u.points+tmp_obj[[u.feature]]
      }
    })
    console.log(tmp_arr)
    console.log(tmp_obj)

    return (
      <Container>
        <Typography variant="h5" gutterBottom component="div" style={{"text-align": "center"}}>
            Showing Data for Survey: "{survey}" <br/>
        </Typography>
        <div>
          <CanvasJSChart options = {options} />
        </div>
        <div>
          {JSON.stringify(sumData)}
        </div>

        <AllDataTable title={["Being Evaluated", "Points", "Feature", "Evaluator"]} sumData={sumData} idSum={idSum}/>
      </Container>
    );
  }
  
  export default Charts;
  