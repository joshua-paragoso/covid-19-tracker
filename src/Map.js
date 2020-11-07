import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";

function Map({center, zoom }) {
  return (
    <div className="map">
      
      <MapContainer center={center} zoom={zoom} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      {/*loop through and draw circles on screen to indicate cases
      big for more cases, small for less cases */}
      </MapContainer>

    </div>
  );
}

export default Map;
