// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=94d549db2a7fd76a036a54a2043babb8
import React,{useState,useEffect} from "react";
import "./style.css";
import WeatherCard from "./weathercard";
const Weather=()=>{
    const [searchValue,setSearchValue] = useState("kolkata");
    const [tempInfo,setTempInfo] = useState({});
    const getWeatherInfo=async()=>{
        try{
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=94d549db2a7fd76a036a54a2043babb8`;
            
            const res = await fetch(url);
            const data = await res.json();

            const {temp,pressure,humidity} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country,sunrise,sunset} = data.sys;
            const myWeatherInfo = {
                temp,
                pressure,
                humidity,
                weathermood,
                name,
                speed,
                country,sunrise,sunset
            }
            setTempInfo(myWeatherInfo);
        }catch(err){
            console.log(err);
        }
    };
    useEffect(()=>{getWeatherInfo()});
    return(
        <>
            <div className="wrap">
                <div className="search">
                <input
                    type="search"
                    placeholder="search..."
                    autoFocus
                    id="search"
                    className="searchTerm"
                    value={searchValue}
                    onChange={(e)=>setSearchValue(e.target.value)}
                />
                    <button className="searchButton" type="button" onClick={getWeatherInfo}>
                        search
                    </button>
                </div>
            </div>
            <WeatherCard {...tempInfo}/>
        </>
    );
}
export default Weather;