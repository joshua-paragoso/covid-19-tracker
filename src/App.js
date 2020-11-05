import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect} from 'react';
import './App.css';
import InfoBox from './InfoBox'

function App() {
  
  /* State = how to write a varibale in react */
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  //changes value in dropdown list of what country is selected
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    // console.log("works >>>>", countryCode);
    setCountry(countryCode);
  }

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
        const countries = data.map((country) => (
          {
            name: country.country, //united states, united kingodm
            value: country.countryInfo.iso2 //UK, USA, FR
          }
        ));
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);

  return (
    <div className="app">
      <div className="app__header">

      {/*Header */}
      <h1>covid tracker</h1>

      {/* Title and search input dropdown field */}
      <FormControl className="app__dropdown">
        <Select variant="outlined" 
          onChange={onCountryChange} value={country}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {/*loop through all the countries as show a dropdown list of all the options*/}
          
          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }

          </Select>
      </FormControl>
    </div>
    
    {/* InfoBoxes section */}
    <div className="app__stats">
      <InfoBox title="Coronavirus cases" cases={10000} total={2000}/>

      <InfoBox title="Recovered" cases={20000} total={3000}/>

      <InfoBox title="Deaths" cases={30000} total={4000}/>
      {/*InfoBoxes title = "Coronavirus cases"*/}
      {/*InfoBoxes title = "Coronavirus recovers"*/}
      {/*InfoBoxes*/}
    </div>
      
      
      

      {/*Table*/}
      {/*Graph*/}

      {/* Map */}


      {/*first commit from macbook*/}


      {/* i am typing this to see if i can not get merge conflicts*/}

    </div>
  );
}

export default App;
