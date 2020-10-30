import { FormControl, MenuItem, Select } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>covid tracker</h1>
      
      {/*Drop down component */}
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="abc"
        >
            <MenuItem value="worldWide">option1</MenuItem>
            <MenuItem value="worldWide">option2</MenuItem>
            <MenuItem value="worldWide">option3</MenuItem>
            <MenuItem value="worldWide">option4</MenuItem>

          </Select>
      </FormControl>

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
