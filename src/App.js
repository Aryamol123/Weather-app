import { useEffect, useState,useRef } from "react";
import "./App.css";
import icon from './Images/sunnyIcon.png'
const api = {
  key: "f6cafa5567246645e17dc44fc4e8b178",
  baseURL: "https://api.openweathermap.org/data/2.5/",
};
function App() {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [loading,setLoading] = useState(false)
 const inputRef = useRef("London");
  useEffect(()=>{
   setLoading(true)
    fetch(`${api.baseURL}weather?q=London&units=metric&APPID=${api.key}`)
    .then((res) => res.json())
    .then((result) => {
       
      setWeather(result);
    inputRef.current.focus()
      setLoading(false)
    },[]);
 

  },[])

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(`${api.baseURL}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery(" ");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${date} ${month} ${year} ,${day}`;
  };
  console.log(weather);
  return (
    <div
      className={
       ( typeof weather.main !== "undefined")
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "error"
      }
    >
      <main>
    <div className="icon">
    
    </div>
    <div className="icon-text"> <img src={icon} alt="" /> <h1 >Weather Forecast</h1></div>
       
        <div className="search-box">
          <input
          ref={inputRef}
            type="text"
            
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
        
        {typeof weather.main !== "undefined" && <div className="weather-box">
              <h1 className="temp">{weather?.main?.temp}°C</h1>
  
            </div>}
        {typeof weather.main !== "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name} 
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
              
            </div>

          </div>
        ) : (
          ""
        )}

{typeof weather.main !== "undefined" &&
        <div className="details-wrapper">
              <div className="item-1">
             <h4>Feels like :{weather?.main?.feels_like}</h4>
                  <h4>Humdity:{weather?.main?.humidity}</h4>
                  <h4>Pressure:{weather?.main?.pressure}</h4>
              </div>
              <div className="item-1">
              <h4>Latitude:{weather?.coord?.lat}</h4>
                  <h4>Longitude:{weather?.coord?.lon}</h4>
                  <h4>Timezone:{weather?.timezone}</h4>
              </div>
             
        </div>}
      </main>

 

   {loading && 
         <div id="loader">
          <h1> Loading...</h1> 

          </div>
     }
    </div>
  );
}

export default App;
