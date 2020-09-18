import React, { useContext } from "react";
import { Context } from "../context/context";
import { listCity } from "../listCity";

const NavCity = () => {
  const { cityWeater } = useContext(Context);
  const consultarCitySelect = (e) => {
    e.preventDefault();
    const ciudad = e.target.value;
    cityWeater(ciudad);
  };

  return (
    <div className="p-4">
      <h2 className="font-display text-2xl py-2 text-center">
        Available Cities
      </h2>
      <hr />
      <ul>
        {listCity.map((city) => (
          <li
            key={city.id}
            className="hover:bg-gray-200"
            onClick={consultarCitySelect}
          >
            <button
              className="p-4 focus:outline-none focus:bg-gray-500 focus:text-gray-100 w-full text-left font-body text-xl"
              value={city.value}
            >
              {city.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavCity;
