import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card'
import './App.css'
import './City.txt'

const App = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [apiData, setApiData] = useState([]); // Store API response data
  const [retrieve, setRetrieve] = useState(false)
  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    fetch('./City.txt') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then((text) => {
        const optionsArray = text.split('\n');
        console.log(optionsArray)
        setOptions(optionsArray);
      })
      .catch((error) => {
        console.error('There was a problem fetching the options:', error);
      });
  }, []); 

  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  const handleDestChange = (e) => {
    setDestination(e.target.value);
  };


  const handleSearchClick = () => {
    setErrorMessage('');
    setSource(''); setDestination('');

    if(source==='' || destination===''){
      setErrorMessage('Select values for source and destination');
      setApiData([]);
    }
    else if(source===destination){
      console.log('Both cannot be same');
      setErrorMessage('Source & Destination cannot be the same');
      setApiData([]);
    }
    else{
      console.log('Call API');
      axios.get('https://saisandeep001.pythonanywhere.com/travel/', {
          params: {
            source: source,
            dest: destination,
          },
        })
          .then((res) => {
            setApiData(res.data);
            if(res.data.length > 0)
              setRetrieve(true)
          })
          .catch((error) => {
            console.error('API Error:', error);
            setErrorMessage('Error fetching data from the API');
          });
      } 
    };

  return (
    <div>
    <header className='title-header'>
        TRAIN SCANNER
    </header>
    <div className='dropdown-search-container'>
      <div className='dropdown'>     
          {/* <select className='classic' value={source} onChange={handleSourceChange}>
            <option value="">Select a source</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Warangal">Warangal</option>
            <option value="Tirupati">Tirupati</option>
          </select> */}
          <select className='classic' value={source} onChange={handleSourceChange}>
            <option value="">Select a source</option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
      </div>
      <div className='dropdown'>
        <select className='classic' value={destination} onChange={handleDestChange}>
          <option value="">Select a Destination</option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className='search-button' onClick={handleSearchClick}>
        Search
      </div>
    </div>
    <div className="card-container">
    {errorMessage && <p className='error-message'>{errorMessage}</p>}
    {apiData.length > 0 ? (
      apiData.map((item) => (
        <div className='card'>
          <div className='card-content-header'>
                <p className='box heade'>Station</p>  
                <p className='box heade'>Station</p>
                <p className='box heade'>Departure Time</p>  
                <p className='box heade'>Arrival Time</p>
          </div>
            {item.map((i) => (
              <div className='card-content'>
                <p className='box'>{i.start_station}</p>  
                <p className='box'>{i.end_station}</p>
                <p className='box'>{i.start_time}</p>  
                <p className='box'>{i.end_time}</p>
              </div>
            ))}
        </div>
      ))): retrieve && <p> No trains available</p>}
    </div>
    </div>

  );
};

export default App;