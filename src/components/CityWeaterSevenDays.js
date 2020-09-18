import React, { useContext } from "react";
import moment from "moment-timezone";
import { Context } from "../context/context";

const formato = "dddd Do MMM"; // September 16th 2020

const CityWeaterSevenDays = () => {
  const { name, cityPost } = useContext(Context);
  const { daily } = cityPost;
  return (
    <div className="bg-gray-300 mt-4 p-4">
    <h3 className="font-display text-3xl pb-4">How will the weather be in {name}?</h3>    
      <div className="grid grid-cols-4 gap-4">
        {daily.map((dia) => (
          <div key={dia.dt} className="text-center p-2 bg-gray-400">    
            <p className="text-lg">{moment(dia.dt * 1000).format(formato)}</p>
            <img
              src={`https://openweathermap.org/img/wn/${dia.weather[0].icon}@2x.png`}
              alt={dia.weather[0].main}
              className="block mx-auto"
            />    
            <p className="text-lg">{dia.weather[0].main} - {dia.weather[0].description}</p>
            <p className="text-2xl">{parseFloat(dia.temp.day).toFixed(0)} <span>&#x2103;</span></p>
            </div>  
        ))}
      </div>
    </div>
  );
};

export default CityWeaterSevenDays;