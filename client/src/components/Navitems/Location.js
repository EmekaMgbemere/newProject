import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bckimg from '../images/car111.jpg';
import Nav from './Nav';
import Footer from './Footer';

function Location() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6969/location')
      .then((res) => res.json())
      .then((data) => setLocations(data.data));
    }, []);
    

    const clickedLocation = (locname) => {
    localStorage.setItem('locname', locname);
  };


  const backgroundStyle = {
    backgroundImage: `url(${bckimg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.7)',
  };

  return (
    <div className='' style={backgroundStyle}>
      <Nav />
      <div className="container-fluid" style={{fontWeight: '900', padding:'4vw 2vw'}}>
          <div className='text-light display-3' style={{ fontWeight: '600', margin:"10px 0" }}> All Theaters</div>
              <div className='cube gap-4' >
                {locations.map((locs, _id) => (
                  <div key={_id} className='p-2 '>
                        <div className='' style={{border: '2px solid gray',borderRadius: '10px', width: '80vw', padding:"1rem", fontFamily:"Roboto, sans-serif"}}>
                             <Link to={`/cinema/${locs.location}`} style={{ textDecoration: 'none' }} onClick={() => clickedLocation(locs.location)}>
                                <p className='text-info display-4' style={{}}>{locs.location}</p>
                                <p>STATE:{locs.state}</p>
                                <p>CITY:{locs.city}</p>
                                <p>STREET:{locs.street}</p>
                                <p>HOUSE NUMBER:{locs.housenumber}</p>
                              </Link>
                        </div>
                  </div>
                  ))}
              </div>   
      </div>
      <Footer />
    </div>
  );
}

export default Location;

