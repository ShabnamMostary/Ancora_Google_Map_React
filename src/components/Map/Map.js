import React, { useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import styles from './Map.css';
import Locate from "./Locate";

 const options = {
  styles: styles,
  zoomControl: true,
  scrollwheel: false,
  rotateControl: true
};

const mapContainerStyle = {
  height: "85vh",
  width: "70vw",
};

export default function App(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [selected, setSelected] = useState(null);
 
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
}, [])
//for locate
const panTo = React.useCallback(({ lat, lng }) => {
  mapRef.current.panTo({ lat, lng });
}, [])




//setting map center at first trial location 
  const getCenter =()=> {
    let lat = Number(props.selectedTrial.locations[0].lat);
    let lng = Number(props.selectedTrial.locations[0].lng);
    
    return {lat: lat, lng:lng};
  }

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={getCenter()}
        options={options}
        onLoad={onMapLoad}
      >
        
       {props.selectedTrial.locations.map((location, index) => {
            return (
                <Marker
                  key={index}
                  title={
                    location.facility_name
                    }
                  // name={
                  //   location.facility_name
                  // }
                  position={{
                    lat:
                      Number(location.lat),
                    lng:
                      Number(location.lng),
                  }}
                  icon={{
                      url: "marker.png",
                        origin: new window.google.maps.Point(0, 0),
                        //for infowindow position in marker
                        anchor: new window.google.maps.Point(15, 25),
                        //marker size
                      // scaledSize: new window.google.maps.Size(30, 35),
                   }}
                  //added onclick event to marker
                 onClick={() => {
                  setSelected(location);
                  //set the focus ouside the map to get rid of a random black-border around a marker
                  document.getElementById('auto_focus').focus();
                }} />
       )})}
                  {selected ? (
                      <InfoWindow
                        position={{ lat: Number(selected.lat), lng: Number(selected.lng) }}
                        onCloseClick={() => {
                          setSelected(null);
                        }}

                      >
                        <div className="box">
                          <a href={`https://www.ancora.ai/details/${props.selectedTrial.trial_id}`} className="links">
                            <p><b> {selected.facility_name}</b> <br/><br/>
                            City: {selected.city} <br/>
                            Country: {selected.country}</p> 
                          </a>
                        </div>
                      </InfoWindow>
                         ) : null }
      </GoogleMap>
    </div>
  );
}

