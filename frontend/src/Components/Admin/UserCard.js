export default function UserCard(props){
    return (
        <>
            <div className="table100-body">
                <table>
                    <tbody>
                        <tr className="row100 body">
                            <td className="cell100 column1">{props.value.Name}</td>
                            <td className="cell100 column2">{props.value.email}</td>
                            <td className="cell100 column3">{props.value.isAdmin === true ? "True" : "False"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}