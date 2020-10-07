import React, { Component } from 'react';
import { withScriptjs } from "react-google-maps";
import MapWindow from './MapWindow';
// import './style.css';

import {mapData, getMapDataLayer} from '../../helpers/helpers'
const mapDataNew = getMapDataLayer(mapData);

const Maps = ({state}) => {


  const MapLoader = withScriptjs(MapWindow);
console.log('omar i am here')
  const mapUrl = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAP_KEY}`

  return (
    <MapLoader
    mapData={mapDataNew}
      googleMapURL={mapUrl}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100vh` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  );
};


export default Maps;