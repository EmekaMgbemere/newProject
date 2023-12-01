import React, { useCallback, useEffect, useState } from "react";
import TheaterAdminleftnav from "./TheaterAdminleftnav";
import Admintopnav from "./Admin/Admintopnav";
import { Link, useNavigate } from "react-router-dom";

function Theateradmin(){
    
    const [users, showUsers] = useState();
    const [create, setCreate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secretKey, setSecretkey] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [location, setLocation] = useState([]);
    const [selectedlocation, setSelectedLocation] = useState([]);


    const [err, setErr] = useState("");

    const theaterID = localStorage.getItem("theaterID");


    const nav = useNavigate();

    function handlesetchange( ){
      setCreate(!create);
      setEmail('');
      setSecretkey('');
      setPassword('');
      setErr("");
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
        if (selectedlocation === "" || email === "" || password === ""|| secretKey === "") { 
              setErr("Please fill all fields!"); 
              alert("Please fill all fields!"); 
        } 
        else {
                const newUser = { secretKey, password, email, userType:'cinemaadmin', theaterID: theaterID, selectedlocation };

                fetch('http://localhost:6969/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newUser),
                  })
                  .then(() => {
                    setEmail('');
                    setSecretkey('');
                    setPassword('');
                    alert("Counter Successfully Created")
                  })
                  .catch(err => console.log(err))
            } 
    }

    useEffect(() => {
      fetch("http://localhost:6969/location", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setLocation(data.data);
        });
     }, []);


const handleLocationChange = (event) => {
  setSelectedLocation(event.target.value);
};


    
    const user = useCallback (async () =>  {
          fetch("http://localhost:6969/users")
            .then(res => res.json())
            .then(data => {
                            showUsers(data); 
                            setLoading(false);
                            const fd = data.filter(item => item.theaterID === theaterID);
                            setFilteredData(fd);
                          })
            .catch(error => {
              console.error('Error fetching data:', error);
              setLoading(false);
            });
      },[theaterID]);

      useEffect(() => {
        user();
      },[user]);

      // useEffect(() => {
      //   const thisuser = setTimeout(() =>{user()}, 2000); 
      //   return () => {clearTimeout(thisuser)};
      // });



    //    useEffect(() => {
    //   fetch('http://localhost:3000/cinema')
    //     .then(response => response.json())
    //     .then(data => setLoading(false))
    //     .catch(error => {console.error('Error fetching data:', error); setLoading(false);});
    // }, [ create ]);
  

    if (loading) {
      return <p>Loading...</p>;
    }


    const handleDeleteUser = async (id) => {
        try {
          const response = await fetch(`http://localhost:6969/users/${id}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            const updatedUsers = users.filter(user => user._id !== id);
            showUsers(updatedUsers);
          } else {
            console.error('Error deleting user');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };

    return(
        <div className="">
          <div className='emadmindash '>
                  <div>
                      <Admintopnav />
                  </div>
                  <div style={{ width: "90vw" }} className="d-flex">
                      <div>
                          <TheaterAdminleftnav />
                      </div>
                      <div className="w-100">
                            {  err && <div className="text-danger"> {err}</div> }
                            <div  className="m-3">
                                <div className="d-flex justify-content-between">
                                        <Link to="">
                                              <button type="button" className="btn btn-outline-dark mx-3 " onClick={handlesetchange} ><i className="fa-solid fa-plus px-2"></i>Create</button>
                                        </Link>
                                        <div className="float-left">Theater ID: {theaterID}</div>
                                </div>
                            </div>
                            <div>
                                {
                                  create &&
                                  <div>
                                    <form onSubmit={handleSubmit} enctype="multipart/form-data"> 
                                      <div className="p-3">
                                      <div className=" registerinput my-2">
                                                    <label htmlFor="formGroupExampleInput">Location</label>
                                                    <div>
                                                        <select className='p-2 ' onChange={handleLocationChange}>
                                                            <option value="location" disabled selected> <i>Select Location</i></option>
                                                                {location.map((f, index) => (
                                                                  <option key={index}>
                                                                    {f.location}
                                                                  </option>
                                                                ))}
                                                        </select>
                                                    </div>
                                                  </div>
                                            <div className=" registerinput my-2">
                                                <label htmlFor="formGroupExampleInput">Counter </label>
                                                  <input type="email" 
                                                  className="form-control" 
                                                  placeholder="Enter Counter Admin Name" 
                                                  defaultValue={email}
                                                  onChange={(e) => setEmail(e.target.value)}           
                                                  />
                                              </div>

                                              <div className="registerinput my-2">
                                                  <label htmlFor="formGroupExampleInput">Secret Key</label>
                                                    <input type="text" className="form-control" 
                                                    required 
                                                    placeholder="Create Secret key" 
                                                    autoFocus
                                                    defaultValue={secretKey}
                                                    onChange={(e) => setSecretkey(e.target.value)}
                                                    />
                                              </div>

                                              <div className="registerinput my-2">
                                                  <label htmlFor="formGroupExampleInput">Password</label>
                                                    <input type="text" className="form-control" 
                                                    required 
                                                    placeholder="Enter Password" 
                                                    autoFocus
                                                    defaultValue={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    />
                                              </div>
                                                
                                                <div className="my-4">
                                                  <button className="btn btn-primary" type="submit" >Create</button>
                                                </div>
                                                
                                      </div>
                                    </form> 
                                  </div>                     
                                }
                          </div>
                          <div> 
                              <table className="table m-3" border={"1px"}>
                                <thead>
                                        <tr>
                                            <th >ID</th>
                                            <th >UserType</th>
                                            <th >Email</th>
                                            <th >Theater ID</th>
                                            <th >Secret Key</th>
                                            <th >Actions</th>
                                        </tr>
                                </thead>
                                  <tbody>
                                  {
                                    filteredData && filteredData.map((user, id) => {
                                        return (
                                            <tr key={id}>
                                                <td >{user._id}</td>
                                                <td >{user.userType}</td>
                                                <td >{user.email}</td>
                                                <td >{user.theaterID}</td>
                                                <td >{user.secretKey}</td>
                                                <td>
                                                        <div>
                                                            <Link onClick={() => handleDeleteUser(user._id)}>
                                                            <i className="fa-solid fa-trash" style={{ color: "#ec1809", marginRight: "10px" }}></i>
                                                            </Link>
                                                            <Link to={"/adminedituser/"+user._id}>
                                                            <i className="fa-solid fa-pen-to-square" style={{ color: "#2450a8", marginRight: "10px" }} onClick={() => nav("/adminedituser", { state : users})}></i>
                                                            </Link>
                                                        </div>
                                                </td>
                                    </tr>
                                        );
                                    })
                                    }
                                  </tbody>
                              </table> 
                          </div>
                    </div>
                  </div>
          </div>
        </div>
    )
}

export default Theateradmin;