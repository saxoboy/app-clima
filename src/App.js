import React, { useContext } from "react";
import { Context } from "./context/context";
import Header from "./components/Header";
import NavCity from "./components/NavCity";
import City, { CityLoading } from "./components/City";
import CityWeaterSevenDays, { CityWeaterSevenDaysLoading } from "./components/CityWeaterSevenDays";
import CityWeaterHistory, { CityWeaterHistoryLoading } from "./components/CityWeaterHistory"

function App() {
  const { citySelect, cityPost, cityPre } = useContext(Context);

  return (
    <div className="bg-gray-400 font-body">
      <Header />
      <section className="grid grid-cols-4 gap-4 container mx-auto">
        <NavCity className="col-span-1 p-4" />
        <main className="col-span-3">
          {citySelect ? <City city={citySelect} /> : <CityLoading />}
          {cityPost ? (
            <CityWeaterSevenDays city={cityPost} />
          ) : (
            <CityWeaterSevenDaysLoading />
          )}
          {cityPre ? (
            <CityWeaterHistory city={cityPre} />
          ) : (
            <CityWeaterHistoryLoading />
          )}
        </main>
      </section>
      <footer className="bg-gray-700">
        <div className="container mx-auto">
          <p className="text-center text-white py-4 text-base">Aqui el footer</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
