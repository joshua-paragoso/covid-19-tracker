import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

export const sortData = (data) => {
    const sortedData = [...data];

    //loop through entire list then sort it
    sortedData.sort((a,b) => {
        //if a is greater than b
        if (a.cases > b.cases){
            //return false
            return -1;
        }else{
            return 1;
        }
    });
    
    return sortedData;
}

//draw circles on the map with interactive tooltopp 
export const showDataOnMap = (data, casesType='cases') => (
    //every time we step through data, its one country
    data.map( country => (

        <Circle
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
        >

        </Circle>


    ))
);