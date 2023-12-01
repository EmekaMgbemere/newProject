import React from 'react';
import { Link } from 'react-router-dom';

function Adminleftnav() {

  return (
  <>
    <div className='emaddashsmleft' >
      <div className='d-flex justify-content-center align-items-center'>
        <p className='text-align-left'>Navigation</p>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to="/adminlocation">
          <div className=''>
          <li>
              <i className="fa-solid fa-location-dot fa-lg"  style={{color: "#a0a0a2", marginRight:"10%"}}>
              </i>
              <span>Location</span>
            </li>
          </div>
        </Link>
      </div>
      
      <div>
        <Link style={{textDecoration: 'none'}} to="/adminmovie">
          <div className=''>
          <li><i className="fa-solid fa-camera fa-lg" style={{color: "#a0a0a2", marginRight:"10%"}}></i><span>Movie</span></li>
          </div>
        </Link>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to="/adminbookings">
          <div className=''>
          <li><i className="fa-regular fa-bookmark" style={{color: "#a0a0a2", marginRight:"10%"}}></i><span>Bookings</span></li>
          </div>
        </Link>
      </div>
      <div>
        <Link style={{textDecoration: 'none'}} to="/adminuser">
          <div className=''>
          <li><i className="fa-solid fa-circle-user fa-lg" style={{color: "#a0a0a2", marginRight:"10%"}}></i><span>Users</span></li>
          </div>
        </Link>
      </div>
      
   </div>

   </>
  );
}

export default Adminleftnav;