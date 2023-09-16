import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState(null); // Store API response data

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestChange = (e) => {
    setDestination(e.target.value);
  };



  const handleSearchClick = () => {
    setErrorMessage('');
    console.log('Selected Source : ', source);
    console.log('Selected Destination : ', destination);
    setSource(''); setDestination('');

    if(source===destination){
      console.log('Both cannot be same');
      setErrorMessage('Source & Destination cannot be the same');
      setApiData(null);
    }
    else{
      console.log('Call API');
      axios.get('https://saisandeep001.pythonanywhere.com/travel/', {
          params: {
            source: source,
            dest: destination,
          },
        })
          .then((response) => {
            setApiData(response);
            console.log(response)
          })
          .catch((error) => {
            console.error('API Error:', error);
            setErrorMessage('Error fetching data from the API');
          });
      } 
    };

  return (
    <div className='dropdown-search-container'>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
      <div className='dropdown'>     
        <div className='dropdown-label'>
          <p>Select Source:</p>
        </div>
        <div className='dropdown-options'>
          <select value={source} onChange={handleSourceChange}>
            <option value="">Select a source</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Warangal">Warangal</option>
            <option value="Tirupati">Tirupati</option>
          </select>
        </div>
        
      </div>
      <div className='dropdown'>
        <div className='dropdown-label'>
          <p>Select Destination:</p>
        </div>
        
        <div className='dropdown-options'>
          <select value={source} onChange={handleSourceChange}>
            <option value="">Select a source</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Warangal">Warangal</option>
            <option value="Tirupati">Tirupati</option>
          </select>
        </div>
      </div>
      <div className='search-button'>
        <button onClick={handleSearchClick}>Search</button>
      </div>
    </div>

  );
};

export default App;

