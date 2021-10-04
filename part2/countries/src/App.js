import { useState, useEffect } from 'react';
import axios from 'axios'
import Data from './components/Data';

function App() {

  const [newCountry, setNewCountry] = useState("")
  const [newListOfCountries, setNewListOfCountries] = useState([])

  function handleNameChange(event) {
    setNewCountry(event.target.value)
  }

  function handleCountryButton(countryName) {
    console.log(countryName)
    console.log("PressedButton")
    setNewCountry(countryName)

  }

  useEffect(() => {
    if (newCountry !== "") {
      axios
        .get(`https://restcountries.com/v3.1/name/${newCountry}`)
        .then(response => {
          console.log('promise fulfilled')
          setNewListOfCountries(response.data)
        })
        .catch(function (error) {
          console.log("Error from axios", error)
          setNewListOfCountries([])
        })
    } else {
      setNewListOfCountries([])
    }
  }, [newCountry])

  return (
    <div>
      <form>
        find countries <input
          value={newCountry}
          onChange={handleNameChange} />
      </form>
      <Data countries={newListOfCountries} handleCountryButton={handleCountryButton}/>
    </div>
  );
}

export default App;
