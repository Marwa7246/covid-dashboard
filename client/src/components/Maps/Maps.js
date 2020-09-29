import React, { Component } from 'react';
import { render } from 'react-dom';
import { withScriptjs } from "react-google-maps";
import MapWindow from './MapWindow';
// import './style.css';

import { getMapDataLayer } from "../../helpers/helpers";

const Maps = ({state}) => {
  console.log(state)

  console.log(state.mapData)
let mapData=[]
if (!state.loading) mapData=getMapDataLayer(state.mapData)

  const MapLoader = withScriptjs(MapWindow);

  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`

  return (
    <MapLoader
    mapData={mapData}
      googleMapURL={mapUrl}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};


export default Maps;