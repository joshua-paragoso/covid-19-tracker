import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import { sortData, prettyPrintStat} from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  /* State = how to write a varibale in react */
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = 
  useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  
  const [mapCountries, setMapCountries] = useState([]);

  //display worldwide stats as the initial stats
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        //set country info
        setCountryInfo(data);
      });
  }, []);

  console.log("COUNTRY INFO >>>", countryInfo);

  //https://disease.sh/v3/covid-19/countries

  /*useEffect = runs a piece of code based on given condition*/
  //runs once when code goes
  useEffect(() => {
    //async -> send a request, wait for it, do soemthing with it
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          //restructure
          const countries = data.map((country) => ({
            name: country.country, //united states, united kingodm
            value: country.countryInfo.iso2, //UK, USA, FR
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  //changes value in dropdown list of what country is selected
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log("works >>>>", countryCode);
    setCountry(countryCode);

    //if country code is worldwide
    const url =
      countryCode === "worldwide"
        ? `https://disease.sh/v3/covid-19/countries/all`
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    //else url is based on country code
    await fetch(url)
      //convert to json
      .then((response) => response.json())
      //set country based on data
      .then((data) => {
        //set country
        setCountry(countryCode);
        //set country info
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.lng]);
        setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          {/*Header */}
          <h1>covid tracker</h1>

          {/* Title and search input dropdown field */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {/*loop through all the countries as show a dropdown list of all the options*/}

              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxes section */}
        <div className="app__stats">
          {/*InfoBoxes title = "Coronavirus cases"*/}
          <InfoBox
            title="Coronavirus cases"
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={countryInfo.cases}
          />

          {/*InfoBoxes title = "Coronavirus recovers"*/}
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />

          {/*InfoBoxes title = Coronavirus deaths*/}
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>

        {/* Map */}
        <Map 
          countries={mapCountries} 
          center={mapCenter} 
          zoom={mapZoom} 
        />

      </div>

      <Card className="app__right">
        <CardContent>
          <h3>live cases by country</h3>

          {/*Table*/}
          <Table countries={tableData} />
          <h3>worldwide new cases</h3>

          {/*Graph*/}
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////////

// function App() {

//   /* State = how to write a varibale in react */
//   const [states, setStates] = useState([]);
//   const [state, setState] = useState('unitedstates');
//   const [stateInfo, setStateInfo] = useState({});

//   //display worldwide stats as the initial stats
//   useEffect(()=> {
//     fetch("https://disease.sh/v3/covid-19/states")
//     .then((response) => response.json())
//     .then((data) => {
//       //set country info
//       setStateInfo(data);
//     });
//   }, []);

//   console.log('State INFO >>>', stateInfo);

//   //https://disease.sh/v3/covid-19/countries

//   /*useEffect = runs a piece of code based on given condition*/
//   //runs once when code goes
//   useEffect(() => {
//     //async -> send a request, wait for it, do soemthing with it
//     const getStatesData = async () => {
//       await fetch("https://disease.sh/v3/covid-19/states")
//       // await fetch("https://disease.sh/v3/covid-19/countries")
//       .then((response) => response.json())
//       .then((data) => {
//         //restructure
//         const state = data.map((state) => (
//           {
//             name: state.state, //united states, united kingodm
//           }
//         ));
//         setStates(state);
//       });
//     };
//     getStatesData();
//   }, []);

//   //changes value in dropdown list of what country is selected
//   const onStateChange = async (event) => {
//     const stateCode = event.target.value;
//     // console.log("works >>>>", countryCode);
//     setState(stateCode);

//     //if country code is worldwide
//     const url = stateCode === 'unitedstates'
//     ? `https://disease.sh/v3/covid-19/countries/states`
//     //else url is based on country code
//     : `https://disease.sh/v3/covid-19/states/${stateCode}`;

//     await fetch(url)
//     //convert to json
//     .then(response => response.json())
//     //set country based on data
//     .then(data => {
//       //set country
//       setState(stateCode);
//       //set country info
//       setStateInfo(data);
//     });
//   };

//   return (
//     <div className="app">
//       <div className="app__left">
//         <div className="app__header">

//         {/*Header */}
//         <h1>covid tracker</h1>

//        {/* Title and search input dropdown field */}
//         <FormControl className="app__dropdown">
//          <Select
//             variant="outlined"
//             onChange={onStateChange} value={state}>

//             <MenuItem value="unitedstates">United States</MenuItem>
//             {/*loop through all the countries as show a dropdown list of all the options*/}

//             {
//               states.map(state => (
//                 <MenuItem value={state.value}>{state.name}</MenuItem>
//               ))
//             }

//           </Select>
//         </FormControl>
//     </div>

//       {/* InfoBoxes section */}
//      <div className="app__stats">

//         {/*InfoBoxes title = "Coronavirus cases"*/}
//         <InfoBox title="Coronavirus cases" cases={stateInfo.todayCases} total={stateInfo.cases}/>

//         {/*InfoBoxes title = Coronavirus deaths*/}
//         <InfoBox title="Deaths" cases={stateInfo.todayDeaths} total={stateInfo.deaths}/>

//       </div>

//         {/* Map */}
//         <Map/>

//       </div>

//       <Card className="app__right">
//         <CardContent>
//           <h3>live cases by country</h3>
//           <h3>worldwide new cases</h3>
//           {/*Table*/}

//           {/*Graph*/}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
export default App;
