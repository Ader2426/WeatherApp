import React, { useState } from "react";
import axios from "axios";
import cloud from "./assets/cloud.png";
import sun from "./assets/Sun.png";
import {AiOutlineSearch} from "react-icons/ai"
import { motion } from "framer-motion";

function App() {
  const [data, setData] = useState({});

  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=d9aab12b9a69f724ab080a06a5b86ed7&units=metric`;

  const searchLocation = (event) => {
    
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    
  };

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter location"
          
          type="text"
        />
        <button className="btn" onClick={searchLocation}><AiOutlineSearch /></button>
  
      </div>

      {data.name !== undefined && (
        <div className="container">
          <div className="top--part">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temperature">
              {data.main ? <h2>{data.main.temp.toFixed()}℃</h2> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          <div className="icon">
            {data.weather[0].main === "Clouds" ? (
              <img src={cloud} alt="clouds" width="140px" />
            ) : data.weather[0].main === "Clear" ? (
              <img src={sun} alt="clear" width="120px" />
            ) : null}
          </div>
          <div className="bottom--part">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like.toFixed()}℃</p> : null}
              <h5>Feels like</h5>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity.toFixed()}%</p> : null}
              <h5>Humidity</h5>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed.toFixed()} km</p> : null}
              <h5>wind speed</h5>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
