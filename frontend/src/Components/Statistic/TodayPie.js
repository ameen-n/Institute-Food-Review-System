import { Pie, Doughnut } from 'react-chartjs-2';



export default function StatisticPie(props) {
    console.log(props)
    const lengthOfLike = props.value.likeonePer;
    const lengthofRating = props.value.ratingonePer;

    let likeKeys = [] , likeValue = [] , ratingKey = [] , ratingValue = [];
                    props.value.likeonePer.forEach(element => {
                    if(element._id == "false")
                        likeKeys.push("Dislike");
                        else
                        likeKeys.push("Like");
                        
                    likeValue.push(element.count);
                });

                props.value.ratingonePer.forEach(element => {
                    ratingKey.push(element._id);
                    ratingValue.push(element.count);
                });

    const state1 = {
        labels: likeKeys,
        datasets: [{
            label: 'Overlike',
            backgroundColor: ['#B21F00', '#C9DE00'],
            hoverBackgroundColor: ['#501800', '#4B5000'],
            data: likeValue
        }]
    }

    const state2 = {
        labels: ratingKey,
        datasets: [{
            label: 'overallRating',
            backgroundColor: ['#B21F00', '#C9DE00', '#2FDE00', '#00A6B4', '#6800B4'],
            hoverBackgroundColor: ['#501800', '#4B5000', '#175000', '#003350', '#35014F'],
            data: ratingValue
        }]
    }


    return (
        <>
            <div className="row mt-10 container mx-auto bg-white rounded p-5 shadow mb-60">
                <h1 className="text-center text-capitalize mt-10 mb-30">Current Food Time Submission</h1>
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