import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

//dictionary object
//shows appropriate thing to access whether it be cases, deaths, or recovered
const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    //   rgb: "rgb(204, 16, 52)",
    //   half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    //   rgb: "rgb(125, 215, 29)",
    //   half_op: "rgba(125, 215, 29, 0.5)",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    //   rgb: "rgb(251, 68, 67)",
    //   half_op: "rgba(251, 68, 67, 0.5)",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];

  //loop through entire list then sort it
  sortedData.sort((a, b) => {
    //if a is greater than b
    if (a.cases > b.cases) {
      //return false
      return -1;
    } else {
      return 1;
    }
  });

  return sortedData;
};

//pretty print stat and return nice string
export const prettyPrintStat = (stat) =>
  //if stat exist
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";
  //if nonexistent, return 0 cases today


//draw circles on the map with interactive tooltopp
export const showDataOnMap = (data, casesType = "cases") =>
  //every time we step through data, its one country
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      color={casesTypeColors[casesType].hex}
      //go into dictionary, access casesType, it will get color
      fillColor={casesTypeColors[casesType].hex}
      fillOpacity={0.4}
      //calculation of circle size
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
          
          <div className="info-container">
        
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>

            <div className="info-name">
              {/*name of country */}
              {country.country}
            </div>
  
            <div className="info-confirmed">
              {/*Number of cases */}
              Cases: {numeral(country.cases).format("0,0")}
            </div>
  
            <div className="info-recovered">
              {/*number of recovered */}
              Recovered: {numeral(country.recovered).format("0,0")}
            </div>
    
            <div className="info-deaths">
              {/*number of deaths */}
              Deaths: {numeral(country.deaths).format("0,0")}
            </div>
  
          </div>
      </Popup>
    </Circle>
  ));
