const BountyTable = (props) => {     
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
                            {/* {JSON.stringify(abc)} */}
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
