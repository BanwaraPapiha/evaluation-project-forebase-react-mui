import { useState, useEffect, useContext } from "react";

const BountyTable = (props) => {     
    // const [newScore, setNewScore] = useState(1)
    // const accelerate = newScore => newScore+0.5;
    // const decelerate = newScore => newScore-0.5;

    return (
        <table>
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
                        <tr>
                            <td>{abc[0]}</td>
                            <td>{abc[1]}</td>
                        </tr>
                    )
                })}
                </tbody>
            }
        </table>
    )
}

export default BountyTable;
