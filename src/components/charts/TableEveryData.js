const AllDataTable = (props) => {     
    return (
        <table style={{"width": "100%"}}>
            <tr>
                {props.title.map(t=>{
                    return(
                        <th>{t}</th>
                    )
                })}
            </tr>
            {props.sumData.length > 0 &&
                <tbody>
                {props.sumData.map((abc)=>{
                    return (
                        <tr>
                            <td>{abc.being_eval}</td>
                            <td>{abc.points}</td>
                            <td>{abc.feature}</td>
                            <td>{abc.evaluator}</td>
                        </tr>
                    )
                })}
                </tbody>
            }
        </table>
    )
}

export default AllDataTable;
