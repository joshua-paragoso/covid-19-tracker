import React from "react";
import { Map, TileLayer } from "react-leaflet";
import "./Map.css";

function MyMap() {
  return (
    <div className="map">
      <h1> i am the map</h1>
      
      <Map center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </Map>

    </div>
  );
}

export default MyMap;
