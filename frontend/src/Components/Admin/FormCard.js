export default function UserCard(props){
    return (
        <>
            <div className="table100-body">
                <table>
                    <tbody>
                        <tr className="row100 body">
                            <td className="cell100 column1">{props.value.UserId.email}</td>
                            <td className="cell100 column3">{props.value.DidLike === true ? "True" : "False"}</td>
                            <td className="cell100 column3">{props.value.Rating}</td>
                            <td className="cell100 column2">{props.value.createdAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}