// import React from "react";
import Map from "../../components/Map/Map"
import Sidedrawer from "../../components/Sidedrawer/Sidedrawer"
import React, { useState } from 'react'
import './MapContainer.css'

import Data from "./trials.json";

const MapContainer = () => {
    const [selectedTrial, setSelectedTrial] = useState(Data[0])
    return (
        <div className='mapcontainer'>
            <Sidedrawer trials={Data} selectedTrial={selectedTrial} setSelectedTrial={setSelectedTrial}/>
            <Map trials={Data} selectedTrial={selectedTrial} /> 
        </div>
    )
}
export default MapContainer
