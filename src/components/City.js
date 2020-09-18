import React, { useContext } from "react";
import moment from "moment-timezone";
import { Context } from "../context/context";
import { WiSunrise, WiSunset, WiHumidity } from "weather-icons-react";

const formato = "dddd Do MMMM YYYY"; // September 16th 2020
const formatoHora = "h:mm a";

const City = () => {
  const { citySelect, cityPost } = useContext(Context);
  const {
    name,
    main_temp,
    main_temp_min,
    main_temp_max,
    main_humidity,
    weather_icon,
    weather_main,
    weather_description,
    dt,
    sys_sunrise,
    sys_sunset,
  } = citySelect;
  const { horaInCity, timezone } = cityPost;
  const sunrise = moment(sys_sunrise * 1000)
    .tz(timezone)
    .format(formatoHora);
  const sunset = moment(sys_sunset * 1000)
    .tz(timezone)
    .format(formatoHora);
  const day = moment(dt * 1000).format(formato)

  return (
    <div className="bg-gray-300 mt-4 p-4">
      <div className="flex flex-wrap mb-4">
        <div className="w-full sm:w-1/2 md:w-1/4">
          <div className="sm:w-48 sm:h-48 h-40 w-30 rounded-full bg-indigo-100 flex-shrink-0 mx-auto">
            <img
              src={`https://openweathermap.org/img/wn/${weather_icon}@4x.png`}
              alt={weather_main}
              className="block"
            />
          </div>
          <p className="uppercase text-center py-4">
            {weather_main} - {weather_description}
          </p>
        </div>
        <div className="w-full sm:w-1/2 md:w-2/4 px-8">
          <p className="pb-2 pt-2 text-lg">{day}</p>
          <p className="pb-4">{horaInCity}</p>
          <h2 className="text-gray-900 text-4xl title-font font-medium mb-2 text-center">
            {name}
          </h2>
          <div className="flex flex-wrap">
            <div className="flex-grow text-center mt-8">
              Temp Min.
              <br />
              {main_temp_min} <span>&#x2103;</span>
            </div>
            <div className="flex-grow text-4xl text-center">
              {main_temp} <span>&#x2103;</span>
            </div>
            <div className="flex-grow text-center mt-8">
              Temp Max.
              <br />
              {main_temp_max} <span>&#x2103;</span>
            </div>
          </div>
        </div>
        <div
          className="w-full sm:w-1/2 md:w-1/4 bg-no-repeat pt-12"
          style={{
            backgroundImage: `url(https://openweathermap.org/img/wn/${weather_icon}@2x.png)`,
            backgroundPosition: "9em -1em",
          }}
        >
          <div className="py-2">
            Sunrise:
            <WiSunrise size={48} color="#000" className="inline-block mx-2" />
            {sunrise}
          </div>
          <div className="py-2">
            Sunset:
            <WiSunset size={48} color="#000" className="inline-block mx-2" />
            {sunset}
          </div>
          <div className="py-2">
            Humidity:
            <WiHumidity size={48} color="#000" className="inline-block mx-2" />
            {main_humidity}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default City;