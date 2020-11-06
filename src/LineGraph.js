import React, {useState, useEffect} from 'react';
import { Line } from "react-chartjs-2";

function LineGraph() {
    
    const [data, setData] = useState({})

    const buildChartData = (data, casesType="cases") => {
        
        const chartData = [];
        let lastDataPoint;

        //loop through all data cases
        //cases was recovered and deaths
        // data[casesType].forEach(date => {
            for (let date in data.cases) {
            //if last data point
            if(lastDataPoint){

                //create new data point
                const newDataPoint = {
                    x: date,
                    //access all cases
                    //try to get the difference between dates to get how much new cases 
                    //came up
                    y: data[casesType][date] - lastDataPoint,
                }
                //push new data intp charData
                chartData.push(newDataPoint);
            } 
                //reinitialize last data point
                lastDataPoint = data[casesType][date];
        } 
            return chartData;
    }
    //gets the last 120 days
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const chartData = buildChartData(data);
            setData(chartData);
        });
    }, []);

    return (
        <div>
            <h3> I am graph</h3>
            <Line 
                data ={{
                    datasets: [{
                            backgroundColor: "rgba(204, 16, 52, 0.5)",
                            borderColor: "#CC1034",
                            data: data, 
                },
                ],
            }}/>
        </div>
    );
}

export default LineGraph
