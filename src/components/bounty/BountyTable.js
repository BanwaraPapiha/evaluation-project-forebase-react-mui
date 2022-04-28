import { useState, useEffect, useContext } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Stack } from '@mui/material';
import "../../styles/table.css";

const TableRow = (props) => {
    const [acc_value, setAcc_value] = useState(1)
    const [bounty, setBounty] = useState(0)
    const accelerate = () => setAcc_value(acc_value+.25)
    const decelerate = () => acc_value > 0 ? setAcc_value(parseFloat(Number(acc_value-.05).toFixed(2))) : setAcc_value(0)
    const oneScore = parseFloat(Number(acc_value*props.data[1]).toFixed(2));
    props.obj[[props.data[0]]] = oneScore
    console.log(props.obj);

    useEffect(()=>{
        props.setAcObj(props.obj)
    }, [acc_value])

    useEffect(()=>{
        console.log("This is One's Money")
        setBounty(Number((oneScore/props.ac_de_Sum)*props.totalBounty).toFixed(1))
        console.log(bounty)
    }, [acc_value, props.totalBounty])

    return (
        <tr>
            <td style={{border: "1px solid black"}}>{props.data[0]}</td>
            <td>{props.data[1]}</td>
            <td style={{border: "1px solid black"}}>{acc_value}</td>
            <td style={{border: "1px solid black"}}>{acc_value} X {props.data[1]}: {oneScore}</td>
            <td>{bounty}</td>
            <td style={{border: "1px solid black"}}>
                <Stack direction="row" spacing={2}>
                    <ArrowUpwardIcon onClick={accelerate}/>
                    <ArrowDownwardIcon onClick={decelerate}/>
                </Stack>
            </td>
        </tr>
    )
}

const BountyTable = (props) => {
    return (
        <table style={{width: "100%"}}>
            <tr>
                {props.title.map(t=>{
                    return(<th>{t}</th>)
                })}
            </tr>
            {props.idSum.length > 0 &&
                <tbody>
                {Object.values(props.idSum).map((abc)=>{
                    return (
                        <TableRow acObj={props.acObj} setAcObj={props.setAcObj} data={abc} obj={props.obj} 
                        totalBounty={props.totalBounty} setBountySum={props.setBountySum} ac_de_Sum={props.ac_de_Sum}/>
                    )
                })}
                </tbody>
            }
        </table>
    )
}

export default BountyTable;
