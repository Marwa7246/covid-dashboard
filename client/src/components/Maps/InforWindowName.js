import React from 'react';
import '../../assets/css/InfoWindow.scss'






function InfoWindowName(props) {
  const {country, cases, onClick, flag, deaths, recovered, updated} = props
  console.log(props)

  return (
    <div className='InfoWindow' >
      <img className='InfoWindow-image'
              src= {flag}
              alt={country}
              onClick={onClick}
            />
      <span><strong> {country}  </strong> </span>
    <div><strong>Cases:</strong>  {cases} </div>
    <div><strong>Deaths:</strong>{deaths} </div>
    <div><strong>Recovered:</strong>{recovered} </div>
    <div><strong>Last Updated:</strong>{updated} </div>
    {/* <div ><i className="fa fa-bell fa-spin fa-2x "></i></div> */}
  </div>
  );
}


export default InfoWindowName