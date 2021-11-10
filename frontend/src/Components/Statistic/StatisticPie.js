import { Pie, Doughnut } from 'react-chartjs-2';



export default function StatisticPie(props) {
    console.log(props)
    const state1 = {
        labels: ['Like', 'Dislike'],
        datasets: [{
            label: 'Overlike',
            backgroundColor: ['#B21F00', '#C9DE00'],
            hoverBackgroundColor: ['#501800', '#4B5000'],
            data: [props.value.like[0].count, props.value.like[1].count]
        }]
    }

    const state2 = {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
            label: 'overallRating',
            backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
            hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
            data: [props.value.rating[0].count, props.value.rating[1].count, props.value.rating[2].count, props.value.rating[3].count, props.value.rating[4].count]
        }]
    }


    return (
        <>
            <div className="row mt-10 mb-100 container mx-auto bg-white rounded p-5 shadow">
                <div className="col-1"></div>
                <div className="col-4">
                    <h3 className="text-center">Total like to dislike</h3>
                    <Pie
                        data={state1}
                        options={{
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                <div className="col-3"></div>
                <div className="col-4">
                <h3 className="text-center">Total rating chart</h3>
                    <Doughnut
                        data={state2}
                        options={{
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </div>
                {/* <div className="col-1"></div> */}

            </div>
        </>
    )
}