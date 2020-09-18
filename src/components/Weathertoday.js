import React from 'react'

const Weathertoday = ({resultMain}) => {

    // extraer datos
    //const { name, main } = resultMain;
    console.log(resultMain);

    //if(!name) return null


    return (
        <div>
            <p>Desde Clima Hoy es:</p> 
            {/* <p>Name: {name}</p>
            <p>Main: {main.temp}</p> */}
        </div>
    )
}

export default Weathertoday
