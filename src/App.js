import { FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useState, useEffect} from 'react';
import './App.css';

function App() {
  
  /* State = how to write a varibale in react */
  const[countries, setCountries] = useState([]);

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

      
      <h1>covid tracker</h1>
      
      {/*Drop down component */}
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="abc">

          {/*loop through all the countries as show a dropdown list of all the options*/}
          {
            countries.map(country => (
              <MenuItem value={country.value}>{country.name}</MenuItem>
            ))
          }

          </Select>
      </FormControl>
    </div>

      {/*Header */}
      {/* Title and search input dropdown field */}
      {/*InfoBoxes*/}
      {/*InfoBoxes*/}
      {/*InfoBoxes*/}

      {/*Table*/}
      {/*Graph*/}

      {/* Map */}


      {/*first commit from macbook*/}


      {/* i am typing this to see if i can not get merge conflicts*/}

    </div>
  );
}

export default App;
