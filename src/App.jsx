import './App.css'
import React, { useEffect, useState } from 'react';
import Clear from "./assets/Clear.png";
import Clouds from "./assets/Clouds.png";
import Rain from "./assets/Rain.png";
import Snow from "./assets/Snow.png";
import Thunderstorm from "./assets/Thunderstorm.png";
import Mist from "./assets/Mist.png";
import { Link } from 'react-router-dom';

function Header(){    
    const [open,setOpen] = useState(false);
    return(
        <>
        <div className='header'>
            <nav onClick={()=>setOpen(!open)}>
                <span className='bar'> </span>
                <span className='bar'> </span>
                <span className='bar'> </span>
            </nav>
            <h1>Weather App</h1>
        </div>
        <div className={`side-nav ${open ? "open" : ""}`}>
                <button className="close-btn"
                    onClick={() => setOpen(false)}>
                    ×
                </button>
                <div className="nav-links">
                    <Link to="/about">AboutMe</Link>
                    <Link to="/feedback">FeedBacks</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className="copyright">
                    <a href="/Yokesh_T_C.pdf" target="_blank" rel="noopener noreferrer">
                        © T.C.Yokesh
                    </a>
                </div>
            </div>
        </>
    );
}

function Search({city, setCity, error, ValidateCity}){
    return(
        <div className='search'>
            <div className='search-box'>
                <input type="text" value={city} placeholder='Enter The City'
                    onChange={(e)=>setCity(e.target.value)}
                    onKeyDown={(e)=>{
                        if (e.key==="Enter"){
                            ValidateCity()
                        }  
                    }}
                />
                <button className='search-btn' onClick={()=>{
                    ValidateCity();
                }}>Search</button>
            </div>
            <p className='error'>{error}</p>
        </div>
    );
}

function WeatherCard({weather}){
    const weatherImages = {
        Clear,
        Clouds,
        Rain,
        Snow,
        Thunderstorm,
        Mist
    };
    console.log(weather.weather[0].main);
    console.log(weather.weather[0]);
    const icons = weatherImages[weather.weather[0].main] || Clear;
    console.log(icons);

    const date = new Date();
    const day = date.toLocaleDateString("english",{
        weekday: "long",
    });

    const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return(
        <div className='weather-container'>
            <div className='weather'>
                <div className='weather-top'>
                    <div className='top'>
                        <img src={icons} className='icon' alt={weather.weather[0].description} /> 
                        <p className='degree'>{Math.round(weather.main.temp)}°C</p>
                        <p className='condition'>{weather.weather[0].main}</p>
                    </div>

                    <div className='top'>
                        <h4 className='city-name'>{weather.name}</h4> 
                        <p className='date'>{day},{time}</p>
                    </div>
                </div>

                <div className='other-details'>
                    <h4 className=''>💧Humidity: {weather.main.humidity}%</h4>
                </div>
                <hr />
                <div className='other-details'>
                    <h4>🌬 Wind: {weather.wind.speed}</h4>
                </div>
                <hr />
                <div className='other-details'>
                    <h4>🌡 Pressure: {weather.main.pressure}pa</h4>
                </div>
                <hr />
                <div className='other-details'>
                    <h4>👁 Visibility: {weather.visibility/1000}km</h4>
                </div>
                <hr />

                <div className='timings'>
                    <h4>SunRise: {new Date(weather.sys.sunrise*1000).toLocaleTimeString()}</h4>
                    <h4>SunSet: {new Date(weather.sys.sunset*1000).toLocaleTimeString()}</h4>
                </div>
            </div>
        </div>
    );
}

function App(){
    const [city,setCity] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState(false);
    const [weather,setWeather] = useState(null);

    const ValidateCity = ()=>{
        if (city.trim()===""){
            setError("Enter The City");
        }
        else{
            setError("");
            ApiCalls();
        }
    }

    function ApiCalls(){
        async function run(){
            try{
                setLoading(true);
                const ApiCode = "d7e775f064bbfc01785220f8027310d8";
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiCode}&units=metric`);
                const data = await response.json();

                if (!response.ok) {
                    setError(data.message || "City not found");
                    setWeather(null);
                    return;
                }
                setWeather(data);
                setLoading(false);
            }
            catch(error){
                setError("City Not Found");
                setWeather(null);
            }
            finally{
                setLoading(false);
            }
        }
        run();
    }

    return(
        <div>
            <Header />
            <Search 
                city={city} 
                setCity={setCity} 
                ValidateCity={ValidateCity}
                error={error}
            />
            {loading && (<div className='loading'> <p>Loading....</p> </div>)}
            {weather && <WeatherCard weather={weather}/>}
        </div>
    );
}

export default App;