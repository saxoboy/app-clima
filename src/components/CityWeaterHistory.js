import React, { useContext } from "react";
import moment from "moment-timezone";
import { Context } from "../context/context";

const formato = "dddd Do MMM"; // September 16th 2020

const CityWeaterHistory = () => {
  const { cityPre } = useContext(Context);

  return (
    <div className="bg-gray-300 mt-4 p-4">
      <div className="bg-gray-300 mt-4 p-4">
        <div className="grid grid-cols-4 gap-4">
          {cityPre.map((dia) => (
            <div key={dia.current.dt} className="text-center p-2 bg-gray-400">
              <p>{moment(dia.current.dt * 1000).format(formato)}</p>
              <p>{parseFloat(dia.current.temp).toFixed(0)} <span>&#x2103;</span></p>
              <p>{dia.current.weather[0].main} - {dia.current.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityWeaterHistory;

export const CityWeaterHistoryLoading = () => (
  <div className="bg-gray-300 mt-4 p-4">Loading...</div>
);
