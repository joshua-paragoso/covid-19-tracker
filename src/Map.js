import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";

function MyMap() {
  return (
    <div className="map">
      
      <MapContainer >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

      </MapContainer>

    </div>
  );
}

export default MyMap;
