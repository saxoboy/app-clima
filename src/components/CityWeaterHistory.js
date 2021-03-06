import React, { useContext } from "react";
import moment from "moment-timezone";
import { Context } from "../context/context";

const formato = "dddd Do MMM"; // September 16th 2020

const CityWeaterHistory = () => {
  const { name, cityPre } = useContext(Context);
  return (
    <div className="bg-gray-300 my-4 p-4">
      <div className="bg-gray-300 mt-4">
        <h3 className="font-display text-3xl pb-4">How was the weather in {name}?</h3>
        <div className="grid grid-cols-5 gap-4">
          {cityPre.map((dia) => (
            <div key={dia.current.dt} className="text-center p-2 bg-gray-400">
              <p className="text-lg">
                {moment(dia.current.dt * 1000).format(formato)}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${dia.current.weather[0].icon}@2x.png`}
                alt={dia.current.weather[0].main}
                className="block mx-auto"
              />
              <p className="text-lg">
                {dia.current.weather[0].main} -{" "}
                {dia.current.weather[0].description}
              </p>
              <p className="text-2xl">
                {parseFloat(dia.current.temp).toFixed(0)} <span>&#x2103;</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityWeaterHistory;