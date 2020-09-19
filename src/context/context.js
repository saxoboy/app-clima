import React, { createContext, useReducer } from "react";
import axios from "axios";
import moment from "moment-timezone";

const appKey = "99e5a727399494fe7125f8efc37bc137";
const formatoHora = "h:mm a";

//Estado Inicial
const initialState = {
  name: "Londres",
  citySelect: null,
  cityPost: null,
  cityPre: null,
  loading: true,
};

// Context
const Context = createContext({
  name: null,
  long: "",
  lati: "",
  citySelect: null,
  cityPost: null,
  cityPre: [],
  loading: true,
  cityWeater: () => {},
});

//Reducer
function cityReducer(state, { type, payload }) {
  switch (type) {
    case "CITY_DATA_WEATHER_DEFAULT":
      return {
        ...state,
        citySelect: payload,
        name: payload.name,
        long: payload.coord_lon,
        lati: payload.coord_lat,
      };
    case "CITY_DATA_WEATHER":
      return {
        ...state,
        citySelect: payload,
        name: payload.name,
        long: payload.coord_lon,
        lati: payload.coord_lat,
      };
    case "CITY_SEVEN_DAYS":
      return {
        ...state,
        cityPost: payload,
        cityPre: [],
      };
    case "CITY_HISTORY":
      const dia = payload;
      const prevDay = state.cityPre;
      return {
        ...state,
        cityPre: [...prevDay, dia],
      };
    default:
      return state;
  }
}

//funcion obtener clima ciudad por nombre
async function getWeatherCity(nameCity) {
  try {
    //Api Clima Ciudad Select
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${nameCity}&appid=${appKey}&units=metric`;
    const climaHoy = await axios.get(url);
    const { coord, weather, main, dt, sys, name } = climaHoy.data;
    return {
      coord_lon: coord.lon,
      coord_lat: coord.lat,
      weather_main: weather[0].main,
      weather_description: weather[0].description,
      weather_icon: weather[0].icon,
      main_temp: parseFloat(main.temp).toFixed(0),
      main_temp_min: parseFloat(main.temp_min).toFixed(0),
      main_temp_max: parseFloat(main.temp_max).toFixed(0),
      main_humidity: main.humidity,
      dt,
      sys_sunrise: sys.sunrise,
      sys_sunset: sys.sunset,
      name,
    };
  } catch (err) {
    console.error("esta mal animal!! " + err.message);
  }
}

//funcion obtener clima por 7 dias
async function getWeatherCitySevenDays(long, lati) {
  try {
    //Api Clima Ciudad Select por 7 dias
    const urlSevenDays = `https://api.openweathermap.org/data/2.5/onecall?lat=${lati}&lon=${long}&appid=${appKey}&units=metric&exclude=minutely,hourly`;
    const climaSieteDias = await axios.get(urlSevenDays);
    const { timezone, current, daily } = climaSieteDias.data;
    const horaInCity = moment(current.dt * 1000)
      .tz(timezone)
      .format(formatoHora);
    return {
      timezone,
      current,
      daily,
      horaInCity,
    };
  } catch (err) {
    console.error("7 dias esta mal animal!! " + err.message);
  }
}

//funcion obtener historia de clima por 5 dias
async function getWeatherCityHistory(day, long, lati) {
  try {
    //Api Clima Ciudad por 5 dias atrás
    const urlHistory = `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lati}&lon=${long}&dt=${day}&appid=${appKey}&units=metric`;
    const climaHistory = await axios.get(urlHistory);
    const { current } = climaHistory.data;
    return {
      current,
    };
  } catch (err) {
    console.error("historico esta mal animal!! " + err.message);
  }
}

//CLima Provider
const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cityReducer, initialState);

  //CONSULTA CLIMA CIUDAD
  const cityWeater = async (cityData) => {
    if (cityData) {
      const resultClimaCiudad = await getWeatherCity(cityData);
      //SEVEN DAYS
      await cityWeaterSevenDays(
        resultClimaCiudad.coord_lon,
        resultClimaCiudad.coord_lat
      );

      //HISTORY
      for (let i = 1; i < 6; i++) {
        let ayer = moment.unix(resultClimaCiudad.dt).subtract(i, "days").unix();
        await cityWeaterHistory(
          ayer,
          resultClimaCiudad.coord_lon,
          resultClimaCiudad.coord_lat
        );
      }
      
      dispatch({
        type: "CITY_DATA_WEATHER",
        payload: resultClimaCiudad,
      });
    }

    // else {

    //   const nameCity = state.name;
    //   const resultClimaCiudad = await getWeatherCity(nameCity); //clima de hoy
    //   //SEVEN DAYS
    //   await cityWeaterSevenDays(
    //     resultClimaCiudad.coord_lon,
    //     resultClimaCiudad.coord_lat
    //   );
    //   //HISTORY
    //   for (let i = 1; i < 6; i++) {
    //     let ayer = moment.unix(resultClimaCiudad.dt).subtract(i, 'days').unix()
    //     await cityWeaterHistory(
    //       ayer,
    //       resultClimaCiudad.coord_lon,
    //       resultClimaCiudad.coord_lat
    //     );
    //   }
    //   dispatch({
    //     type: "CITY_DATA_WEATHER_DEFAULT",
    //     payload: resultClimaCiudad,
    //   });
    // }
  };

  //CONSULTA 7 DIAS DE CLIMA
  const cityWeaterSevenDays = async (long, lati) => {
    const resultClimaSevenDays = await getWeatherCitySevenDays(long, lati);
    dispatch({
      type: "CITY_SEVEN_DAYS",
      payload: resultClimaSevenDays,
    });
  };

  //CONSULTA HISTORICA
  const cityWeaterHistory = async (day, long, lati) => {
    const resultClimaHistoria = await getWeatherCityHistory(day, long, lati);
    dispatch({
      type: "CITY_HISTORY",
      payload: resultClimaHistoria,
    });
  };

  //ejecutamos cityWeather
  // useEffect(() => {
  //   cityWeater();
  // }, []);

  return (
    <Context.Provider
      value={{
        name: state.name,
        long: state.long,
        lati: state.lati,
        citySelect: state.citySelect,
        cityPost: state.cityPost,
        cityPre: state.cityPre,
        loading: state.loading,
        cityWeater,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, WeatherProvider };
