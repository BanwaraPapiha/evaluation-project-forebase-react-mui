const BountyTable = (props) => {     
    return (
        <table>
            <thead>
                <tr>
                    {props.title.map(t=>{
                        return(
                            <th>{t}</th>
                        )
                    })}
                </tr>
            </thead>

            <tbody>
            {props.sumData.length > 0 &&
                <div>
                You have {props.sumData.length} Items.
                {props.sumData.map((abc)=>{
                    return (
                        <li>{JSON.stringify(abc)}</li>
                    )
                })}
                </div>
            }
            </tbody>

{props.idSum.length > 0 &&
            <div>
                {/* <p>Length: {props.idSum.length}</p> */}
                {props.idSum.map((abc)=>{
                    return (
                        <li>{JSON.stringify(abc)}</li>
                    )
                })}

            </div>
            }

        </table>
    )
}

export default BountyTable;
