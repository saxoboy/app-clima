import React, { useContext } from "react";
import moment from "moment-timezone";
import { Context } from "../context/context";

const formato = "dddd Do MMM"; // September 16th 2020

const CityWeaterSevenDays = () => {
  const { cityPost } = useContext(Context);
  const { daily } = cityPost;
  return (
    <div className="bg-gray-300 mt-4 p-4">
      <div className="grid grid-cols-4 gap-4">
        {daily.map((dia) => (
          <div key={dia.dt} className="text-center p-2 bg-gray-400">    
            <p>{moment(dia.dt * 1000).format(formato)}</p>
            <p>{parseFloat(dia.temp.day).toFixed(0)} <span>&#x2103;</span></p>
            <p>{dia.weather[0].main} - {dia.weather[0].description}</p>
            </div>  
        ))}
      </div>
    </div>
  );
};

export default CityWeaterSevenDays;
export const CityWeaterSevenDaysLoading = () => (
  <div className="bg-gray-300 mt-4 p-4">Loading...</div>
);
