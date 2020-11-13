import React from "react";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
// import { MapContainer, TileLayer } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({countries, casesType, center, zoom }) {
  return (
    <div className="map">
      
      <LeafletMap center={center} zoom={zoom} >
      {/* <MapContainer center={center} zoom={zoom} > */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      {/*loop through and draw circles on screen to indicate cases
      big for more cases, small for less cases */}
      {showDataOnMap(countries, casesType)}
      {/* </MapContainer> */}
      </LeafletMap>

    </div>
  );
}

export default Map;
