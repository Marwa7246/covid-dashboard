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
// const customMarker = [
//   {id: 1, position:{ lat: 5, lng: 20.985428 }, country: 'USA', info: [{deaths:'Home2'}, {cases: 10}], "flag": "https://disease.sh/assets/img/flags/af.png"}, 
//   {id:2, position:{ lat: 0, lng: 0 }, info: [{"deaths":'Home2'}, {"cases": 10}]}
// ];
// console.log(dataLayer)



export class MapContainer extends Component {



  state = {
    showingInfoWindow: false,  // Hides or shows the InfoWindow
    activeMarker: {},          // Shows the active marker upon click
    selectedPlace: {}          // Shows the InfoWindow to the selected place upon a marker
  };
  componentDidMount() {
      console.log(this.props.mapData)
      // const customMarkerMap = dataLayer.map(elem=>{
      //   return (
      //     <Marker
      //           key={elem.id}
      //           position={elem.position}
      //           onClick={this.onMarkerClick}
      //           name= {<div>
      //             <img className='image'
      //             src={elem.flag}
      //             alt={elem.id}
      //           />
      //           <span>{elem.country}</span> 
      //           {elem.info.map(e => <div> {Object.keys(e)} :  {Object.values(e)}</div>)}
                
      //           </div>}
      //           // name={elem.info.map(e => <div> {Object.keys(e)} :  {Object.values(e)}</div>)}
      //         />
      
      //   )
      // })   

  }



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

  //   const customMarkerMap = customMarker.map(elem=>{
  // return (
  //   <Marker
  //         key={elem.id}
  //         position={elem.position}
  //         onClick={this.onMarkerClick}
  //         name= {<div>
  //           <img className='image'
  //           src={elem.flag}
  //           alt={elem.id}
  //         />
  //         <span>{elem.country}</span> 
  //         {elem.info.map(e => <div> {Object.keys(e)} :  {Object.values(e)}</div>)}
          
  //         </div>}
  //         // name={elem.info.map(e => <div> {Object.keys(e)} :  {Object.values(e)}</div>)}
  //       />

//   )
// })   

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

// console.log(customMarkerMap);


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
        {/* <Marker
          position={{ lat: -10.748817, lng: 50.985428 }}
          onClick={this.onMarkerClick}
          name={["location: 'Kenyatta International Convention Centre''\n city: 'xyz'"]}

          
        /> */}
         {/* <Marker
          position={{ lat: 10.748817, lng: 50.985428 }}
          onClick={this.onMarkerClick}
          name={'Home'}
        /> */}
        {/* {customMarkerMap} */}
        {this.props.loaded && customMarkerMap2}
        {/* {customMarkerMap} */}


        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
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
  apiKey: process.env.REACT_APP_MAP_KEY 
}
))(MapContainer);
