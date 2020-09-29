import React from 'react';






function InfoWindowName(props) {
  const {country, cases, onClick, image, deaths, recovered, updated} = props

  return (
    <div >
      <img className='image'
              src= {image}
              alt={country}
              onClick={onClick}
            />
      <span><i className="fas fa-bell-on"></i> {country} </span> 
    <div> Cases: {cases} </div>
    <div> Deaths: {deaths} </div>
    <div> Recovered: {recovered} </div>
    <div> Last Updated: {updated} </div>
    <div ></div>
  </div>
  );
}


export default InfoWindowName