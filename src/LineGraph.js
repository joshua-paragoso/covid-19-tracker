import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  
  //hide legend
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  
  //shows the black over to show numbers of cases
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    //x axis 
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],

    //y axis
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType = "cases") => {
  let chartData = [];
  let lastDataPoint;

  //loop through all data cases
  //cases was recovered and deaths
  // data[casesType].forEach(date => {
  for (let date in data.cases) {
    //if last data point
    if (lastDataPoint) {
      //create new data point
      const newDataPoint = {
        x: date,
        //access all cases
        //try to get the difference between dates to get how much new cases
        //came up
        y: data[casesType][date] - lastDataPoint,
      };
      //push new data intp charData
      chartData.push(newDataPoint);
    }
    //reinitialize last data point
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({casesType}) {
  const [data, setData] = useState({});

  //gets the last 120 days
  //https://disease.sh/v3/covid-19/historical/all?lastdays=120

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => response.json())
        // .then((response) => { return response.json(); })
        .then((data) => {
          console.log(data);
          // const chartData = buildChartData(data);
          const chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesType]);

  return (
    <div>
      {/* <h3> I am graph</h3> */}
      {/* checks to see if data exist, returns undefined*/}
      {data?.length > 0 && (
      <Line
        data={{
          datasets: [
            {
              backgroundColor: "rgba(204, 16, 52, 0.5)",
              borderColor: "#CC1034",
              data: data,
            },
          ],
        }}
        options={options}
      />
      )}
    </div>
  );
}

export default LineGraph;
