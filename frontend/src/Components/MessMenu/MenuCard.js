export default function MenuCard(props) {
    return (
        <>
            <div className="table100-body">
                <table>
                    <tbody>
                        <tr className="row100 body">
                            <td className="cell100 column1">{props.value.fooditem}</td>
                            <td className="cell100 column2">{props.value.timing}</td>
                            <td className="cell100 column3">{props.value.day}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}