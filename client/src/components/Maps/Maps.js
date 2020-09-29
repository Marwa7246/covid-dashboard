import React, { Component } from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import InfoWindowsName from './InforWindowName'
// import InfoWindowEx from './InfoWindowEX'

// import "./App.css"

// import {dataLayer} from './helpers'

//  import jason from './jason'

const mapStyles = {
  width: '100%',
  height: '100%'
};


export class MapContainer extends Component {



  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };



  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };


  render() {
    console.log(this.props.mapData)



const customMarkerMap2 = this.props.mapData.map(elem=>{
  return (
    <Marker
          key={elem.country}
          position={elem.position}
          onClick={this.onMarkerClick}
          name={<InfoWindowsName country={elem.country} updated={elem.updated} cases={elem.cases} image={elem.flag} deaths={elem.deaths} recovered={elem.recovered} onClick={()=> console.log('from infowindow')}/>}
        />

  )
}) 



    return (
      <Map
        google={this.props.google}
        zoom={4}
        style={mapStyles}
        initialCenter={
          {
            lat: 20.2884,
            lng: 36.8233
          }
        }
      >
        
        {this.props.loaded && customMarkerMap2}


        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
          // options= {{maxWidth:100}}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
  apiKey: process.env.REACT_APP_MAPS_KEY 
}
))(MapContainer);
