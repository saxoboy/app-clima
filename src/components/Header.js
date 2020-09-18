import React from "react";

const Header = () => {
  return (
    <header className=" bg-gray-700 ">
      <div className="container mx-auto px-4 py-8 flex flex-row items-center">
        <h1 className="flex-1 text-3xl text-gray-100 font-display"> <a href="/" title="Weather App">Weather App</a></h1>
        <div className="flex-auto">Ligth / Dark</div>
        <div>Es / En</div>
      </div>    
    </header>
  );
};

export default Header;
