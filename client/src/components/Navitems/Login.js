import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Nav from "./Nav";
import reg1 from '../images/register/reg1.jpg';



  function Login (){
    
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [err, setErr] = useState("");
  const [cinemaAdmin, setcinemaAdmin] = useState("");
  const [admin, setAdmin] = useState("");
  const [theateradmin, setTheateradmin] = useState("");

  const nav = useNavigate();

   const handleSubmit = async(e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:6969/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }) 

    const data = await response.json();

    if (response.ok) {
      const userId = data.user._id;
      localStorage.setItem("userId", userId);

      const adminToken = data.token;
      localStorage.setItem("adminToken", adminToken);

      setErr('')

      const userFname = data.user.firstname;
      localStorage.setItem('UserFname', userFname);

      const backendUsertype = data.user.userType;
      localStorage.setItem("bkusertype", backendUsertype);
      alert(`Welcome, ${backendUsertype}`)


      if(backendUsertype === "cinemaadmin"){
        setcinemaAdmin("cinemaadmin");
        localStorage.setItem("cinemaAdmin", cinemaAdmin);
        alert(`Welcome, ${backendUsertype}`)
        nav('/cinemahall')
      }

      else if(backendUsertype === "admin"){
        setAdmin("admin");
        localStorage.setItem("admin", admin);
        nav('/admindashboard');      
      }
      
      else if(backendUsertype === "theateradmin"){
        setTheateradmin("theateradmin");
        localStorage.setItem("theateradmin", theateradmin);
        localStorage.setItem("theaterID", userId);
       const theaterid =  localStorage.getItem("theaterID");
        alert(`THIS IS THE THEATER ID, ${theaterid}`)
        nav('/theateradmin');      
      }
      
      else{
        nav('/movies');
      }


    }     
    
    else {
      setErr(data.error);
      alert("FATAL ERROR");
      setemail("");
      setpassword("");
    }


  };


  return (
    
    <div className="bg-black">
        <Nav />
        <div className="emregister ">
            <div className="emregisterform ">
                <form onSubmit={handleSubmit}>
                  <p className="fs-3">Welcome to Eventbux</p>
                  {err && <div className='text-danger align-self-center'>{err} </div>}
                      <div className=""> 
                     
                        <div className="registerinput my-3">
                          <label htmlFor="formGroupExampleInput">Email</label>
                            <input type="email" className="form-control" 
                            id="exampleFormControlInput1" 
                            onChange={(e) => setemail(e.target.value)} 
                            placeholder="" autoFocus/>            
                        </div>
                        <div className=" registerinput my-3">
                              <label htmlFor="formGroupExampleInput">Password</label>
                              <input type="password" className="form-control" 
                              onChange={(e) => setpassword(e.target.value)}  
                              id="inputPassword" placeholder="Password" autoFocus/>
                        </div>
                        <div className="m-3">
                            <button className="reg_" type="submit" >Login</button>
                        </div>
                        <div>
                        <p>Don't have an account, <button className="reg_"><Link to="/signup" style={{textDecoration: "none", color:"white"}} >Signup</Link></button></p>
                      </div>
                      </div>
                </form>
            </div>
            <div className="emregisterimg"> 
                <img src={reg1} alt="img here" className="img-responsive" width='100%' height='auto'/>
            </div>
        </div>

    </div>
  );
}

export default Login;

//  {/* <div>
//                           <span className='mx-2'>Login As</span>
//                             <input
//                               type="radio"
//                               name="UserType"
//                               value="user"
//                               onChange={(e) => setUserType(e.target.value)}
//                             />
//                             <span className='mx-2'>User</span>
//                             <input
//                               type="radio"
//                               name="UserType"
//                               value="Admin"
//                               onChange={(e) => setUserType(e.target.value)}
//                             />
//                     Admin
//                   </div> */}
//                   {/* {userType === "Admin" ? (
//                     <>
//                       <div className="mb-3">
//                         <label>Secret Key</label>
//                         <input
//                           type="text"
//                           className="form-control"
//                           placeholder="Secret Key"
//                           onChange={(e) => setSecretKey(e.target.value)}
//                         />
//                       </div>
//                     </>
//                     ) : null} */}