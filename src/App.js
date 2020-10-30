import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  
  /* State = how to write a varibale in react */
  const[countries, setCountries] = useState([
    'usa', 'uk', 'india'
  ]);

  //https://disease.sh/v3/covid-19/countries

  /*useEffect = runs a piece of code based on given condition*/
  //runs once
  useEffect(() => {

  }, [countries]);
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
              <MenuItem value={country}>{country}</MenuItem>
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
