import { Bar } from 'react-chartjs-2';

export default function StatisticBar(props) {
    const state = {
        labels: ['Sunday' , 'Monday' , 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday' , 'Saturday'],
        datasets: [
            {
                label: 'Breakfast',
                backgroundColor: '#B21F00',
                borderColor: '#501800',
                borderWidth: 2,
                data: [props.v[0].count , props.v[4].count , props.v[8].count , props.v[12].count , props.v[16].count , props.v[20].count , props.v[24].count]
            },
            {
                label: 'Lunch',
                backgroundColor: '#C9DE00',
                borderColor: '#4B5000',
                borderWidth: 2,
                data: [props.v[2].count , props.v[6].count , props.v[10].count , props.v[14].count , props.v[18].count , props.v[22].count , props.v[26].count]
            },
            {
                label: 'Snacks',
                backgroundColor: '#2FDE00',
                borderColor: '#175000',
                borderWidth: 2,
                data: [props.v[3].count , props.v[7].count , props.v[11].count , props.v[15].count , props.v[19].count , props.v[23].count , props.v[27].count]
            },
            {
                label: 'Dinner',
                backgroundColor: '#00A6B4',
                borderColor: '#003350',
                borderWidth: 2,
                data: [props.v[1].count , props.v[5].count , props.v[9].count , props.v[13].count , props.v[17].count , props.v[21].count , props.v[25].count]
            }
        ]
    }
    return (
        <>
            <div className="container mb-100 mx-auto bg-white rounded p-5 shadow">
            <h2 className="text-center mb-10">Total Submission chart</h2>
            <Bar
                data={state}
                options={{
                    barValueSpacing: 5,
                    title: {
                        display: true,
                        text: 'Total form submit',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
            </div>
        </>
    )
}