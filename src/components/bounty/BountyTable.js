import { useState, useEffect, useContext } from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Stack } from '@mui/material';

const TableRow = (props) => {
    const [acc_value, setAcc_value] = useState(1)
    const accelerate = () => setAcc_value(acc_value+.25)
    // const decelerate = () => setAcc_value(Math.round(acc_value-.25 * 10) / 10)
    const decelerate = () => acc_value > 0 ? setAcc_value(parseFloat(Number(acc_value-.05).toFixed(2))) : setAcc_value(0)

    // props.obj[[props.data[0]]] = parseFloat(Number(acc_value*props.data[1]).toFixed(2));
    console.log(props.obj);

    // if (!props.obj.length===1) {
    //     props.obj[[props.data[0]]] = parseFloat(Number(acc_value*props.data[1]).toFixed(2));
    //     props.setBountySum(props.obj) };
    // } 
    // else {

    // }
    console.log(props.obj);
    
    return (
        <tr>
            <td style={{border: "1px solid black"}}>{props.data[0]}</td>
            <td>{props.data[1]}</td>
            <td style={{border: "1px solid black"}}>{acc_value}</td>
            <td style={{border: "1px solid black"}}>
                <Stack direction="row" spacing={2}>
                    <ArrowUpwardIcon onClick={accelerate}/>
                    <ArrowDownwardIcon onClick={decelerate}/>
                </Stack>
            </td>
            <td style={{border: "1px solid black"}}>Multiple of {props.data[1]}: {parseFloat(Number(acc_value*props.data[1]).toFixed(2))}</td>
            <td>Money</td>
        </tr>
    )
}

const BountyTable = (props) => {
    const [acObj, setAcObj] = useState({});
    const obj = {};
    return (
        <>
            <div>{props.totalBounty}</div>
            <table style={{border: "1px solid black"}}>
                <tr>
                    {props.title.map(t=>{
                        return(
                            <th>{t}</th>
                        )
                    })}
                </tr>
                {props.idSum.length > 0 &&
                    <tbody>
                    {Object.values(props.idSum).map((abc)=>{
                        return (
                            <TableRow data={abc} obj={obj} setBountySum={props.setBountySum}/>
                        )
                    })}
                    </tbody>
                }
            </table>
        </>
    )
}

export default BountyTable;
