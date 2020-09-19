import React, { useContext, useEffect } from "react";
import ClockLoader from "react-spinners/ClockLoader";
import { Context } from "./context/context";
import Header from "./components/Header";
import NavCity from "./components/NavCity";
import City from "./components/City";
import CityWeaterSevenDays from "./components/CityWeaterSevenDays";
import CityWeaterHistory from "./components/CityWeaterHistory";

function App() {
  const { name, loading, citySelect, cityPost, cityPre, cityWeater } = useContext(Context);

  useEffect(() => {
    cityWeater(name)
    // eslint-disable-next-line 
  },[]) 
  
  //Loading
  const Loading = () => {
    return (
      <div className="grid grid-cols-1 gap-0 justify-items-auto h-64 bg-gray-300 mt-4 p-4">
        <div className="flex justify-center items-center px-4 py-2">
          <ClockLoader size={50} color={"#000"} loading={loading} />
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-400 font-body">
      <Header />
      <section className="grid grid-cols-4 gap-4 container mx-auto">
        <NavCity className="col-span-1 p-4" />
        <main className="col-span-3">
          {citySelect ? <City city={citySelect} /> : <Loading />}
          {cityPost ? <CityWeaterSevenDays /> : <Loading />}
          {cityPre ? <CityWeaterHistory /> : <Loading />}
        </main>
      </section>
      <footer className="bg-gray-700">
        <div className="container mx-auto">
          <p className="text-center text-white py-4 text-base">
            © 2020 Israel Herrera E.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
