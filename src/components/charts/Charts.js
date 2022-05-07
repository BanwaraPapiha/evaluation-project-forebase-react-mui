import { useState, useEffect, useContext } from "react";
import { Db } from "../../firebase-config/db";
import { collection, getDocs } from "firebase/firestore";
import { SurveyCTx } from "../../providers/surveyctx";
import AllDataTable from "./TableEveryData";
import { Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import CanvasJSReact from '../../canvas_js/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Charts() {
    const [scoreData, setScoreData] = useState([]);
    const [sumData, setSumData] = useState([]);
    const [idSum, setIdSum] = useState([]);
    const [pass_data, setPass_data] = useState([]);
    const [select_by, setSelect_by] = useState('')
    const [select_q, setSelect_q] = useState('')
    const Calc_Data = [];
    const Calc_Scor = {};
    const surveyCtx = useContext(SurveyCTx)
    const survey = surveyCtx.survey[0]['id']
    const usersCollectionRef_survey = collection(Db, survey);

    const handleSelect = (e) => {
      setSelect_by(e.target.value)
    }

    const handle_q = (e) => {
      setSelect_q(e.target.value)
      console.log(select_q)
    }
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
      setPass_data(Calc_Data)
      // setPass_data(sumData)
      // console.log(idSum)

    }, [scoreData, survey])

    useEffect(()=>{
      const searchthrough = ()=>{
        var newArr = []
        if (select_by!=='' && select_q!=='') {
          for (const value of Object.values(sumData)) {
            console.log(value)
            if (String(value[[select_by]]).toLowerCase().includes(String(select_q).toLowerCase())) {
              console.log(true)
              newArr.push(value)
            }
          }
          setPass_data(newArr)
        }
        else {
          // newArr = sumData
          setPass_data(sumData)
        }
      }
      searchthrough()  
    }, [select_by, select_q])
    return (
      <Container>
        <br/>
        <Typography variant="h6" gutterBottom component="div"       
          style={{"text-align": "center", "min-height": "10vh", "background-color":"rgb(123, 31, 162)", "color": "rgb(248, 247, 249)", 
          "border-radius": "10px 10px 0px 0px",
        }}
        >
            <br/>Showing Data for Survey: "{survey}" <br/>
        </Typography>

        {/* <Typography variant="h5" gutterBottom component="div" style={{"text-align": "center"}}>
            Showing Data for Survey: "{survey}" <br/>
        </Typography> */}
        <div>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select By</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={select_by}
            label="Select By"
            onChange={handleSelect}
          >
            <MenuItem value='feature'>Feature</MenuItem>
            <MenuItem value='evaluator'>Evaluator</MenuItem>
            <MenuItem value='being_eval'>Being Evaluated</MenuItem>
          </Select>
          <br/>
          <TextField onChange={handle_q} id="outlined-basic" label="Search" variant="outlined" />
        </FormControl>
        <br/>
        <br/>
        </div>

        <div style={{"overflow-x": "auto"}}>
          <AllDataTable title={["Being Evaluated", "Points", "Feature", "Evaluator"]} sumData={pass_data} />
        </div>
      </Container>
    );
  }
  
  export default Charts;
  