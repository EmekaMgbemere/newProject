import React, { useEffect, useState } from 'react';
import Nav from "./Nav";
import { useParams, useNavigate} from "react-router-dom";
import Footer from './Footer';
import emmoviechair from '../images/emmoviechair.png';
import cinemascreen from '../images/cinema.png';

function Moviedetails(){

  const gdst4d = "Gold 4D";

  const gdst = "Gold";

  const reg = "Regular";

  const vip = "vip";

  const goldSeat4D = 4500;

  const goldSeat = 3500;

  const regular = 2500;

  const vipprice = 5500;

  const [goldseat4dsubtotal, setgoldseat4dsubtotal] = useState(0);

  const [goldseatsubtotal, setgoldseatsubtotal] = useState(0);

  const [regularsubtotal, setregularsubtotal] = useState(0);

  const [vipsubtotal, setvipsubtotal] = useState(0);
  
  const goldseat4dtotal = goldSeat4D * goldseat4dsubtotal;

  const goldseattotal = goldSeat*goldseatsubtotal;

  const regulartotal = regular*regularsubtotal;

  const viptotal = vipprice*vipsubtotal;

  const total = goldseat4dtotal+goldseattotal+regulartotal;

localStorage.setItem("totalStorage", `${total}`);

  const { id } = useParams();

  const [ posts , setPosts ] = useState([]);

  const moviename = `${posts.movietitle}`;

  localStorage.setItem("Movietitle", `${posts.movietitle}`);
  localStorage.setItem("productDescription", `${posts.description}`);
  localStorage.setItem("productPrice", `${posts.price}`);

 const [ movieshow, setMovieShow] = useState([]);


 const [ moviecinema, setMoviecinema] = useState([]);

  const [date, setDate] = useState([]);

  const [thisTime, setThistime] = useState([]);

  const [option1, setOption1] = useState('');

  const [selectedDate, setSelectedDate] = useState('');

  const [selectedOption, setSelectedOption] = useState('');

   localStorage.setItem('time', option1);

  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const [selectedID, setSelectedId] = useState('');
  const [arrId, setArrId] = useState([]);
  const [dispArr, setDispArr] = useState([]);
  JSON.stringify(dispArr);
  const [totalCount, setTotalCount] = useState(0);
  const [errmsg, setErrmsg] = useState(" ");
  const [sucmsg, setSucMsg] = useState(" ");
  const [seatTrue, setSeatTrue] = useState(false);


  const handleclick = async (e) => {
    e.preventDefault();
    setSelectedId(e.target.id);
    setArrId((currentArrId) => [...currentArrId, e.target.id]);
  };

  const handleAddId = async (e) =>{
    try {
      const response = await fetch('http://localhost:6969/bookingapi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ arrId, selectedID })
      });

      if (response.status===200) {
        setErrmsg("")
        const { msg } = await response.json();
        const successmsg = JSON.stringify(msg);
        setErrmsg(" ");
        setSucMsg(successmsg);
      } 
      if(response.status===400){
        const { msg } = await response.json();
        const badmsg = JSON.stringify(msg);
        setErrmsg(badmsg);
        setSucMsg(" ")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  useEffect(() => {
    fetch("http://localhost:6969/bookingapi")
    .then((res) => res.json())
    .then((data) => {
                      setDispArr(data);
                      setTotalCount(data.length)});
                      setErrmsg("")
  }, [arrId, selectedID]);


  function Seat(){
    setSeatTrue(!seatTrue);
  }

  function handleChange1(event){
      setOption1(event.target.value);
  }

  function handleChange2(event){
    setSelectedOption(event.target.value);
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const getSelectedDayInFull = () => {
    const date = new Date(selectedDate);
    const options ={
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
    }
    return date.toLocaleDateString('en-US', options);
  };
 
  const fff= getSelectedDayInFull();

 localStorage.setItem('Chosendate', fff);

  const sss = `You have chosen ${goldseat4dsubtotal} tickets with seats from ${gdst4d} hall at ₦${goldseat4dtotal}.`;
  const ggg = `You have chosen to buy ${goldseatsubtotal} tickets with seats from ${gdst} hall at ₦${goldseattotal}.`;
  const rrr = `You have chosen to buy ${regularsubtotal} tickets with seats from ${reg} hall at ₦${regulartotal}.`;
  const vvv = `You have chosen to buy ${vipsubtotal} tickets with seats from ${vip} hall at ₦${viptotal}.`;
  const none= '';  

  useEffect(() =>{
    fetch("http://localhost:6969/movie")
    .then((res) => res.json())
    .then((data) => {setDate(data.data); setThistime(data.data)})
  },[date])

  useEffect(() =>{
    fetch(`http://localhost:6969/movie/${id}`)
          .then((res) => res.json())
          .then((data) => {setPosts(data)})
        },[id])

        useEffect(() => {
          fetch('http://localhost:6969/cinemahall')
            .then((response) => response.json())
            .then((data) => { setMovieShow(data) });
        }, []);

                
          useEffect(() => {
            fetch('http://localhost:6969/cinema')
            .then((response) => response.json())
            .then((data) => setMoviecinema(data.data))
            .catch(error => { console.error('Error fetching data:', error)})
            }, []);


    const flutterpaymm = () => {
        if (!selectedDate || !option1) {
           setErrorMessage('Please select Time Or Date to proceed');
         }
         else {
           setErrorMessage('');
           navigate('/flutterpayment');
         }
       }


  const sendtouser = [selectedOption, selectedID, option1, selectedDate, moviename];

  localStorage.setItem('sendtouser', JSON.stringify(sendtouser));

  const backgroundStyle = {
    backgroundImage: `url(${posts.movieimage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '90vh', 
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.7)'
  };

const link = posts.movietrailer;

const openVideoInNewTab = () => {
  window.open(link, '_blank');
};

const uniqueMovieDates = [...new Set(movieshow.map((date) => date.moviedate))];


  return(
  <div className=''> 
      <Nav />
    <div className='' >
      <div className="w-100 pt-5 pb-2" style={backgroundStyle}>
          <div className="bg-transparent emcounterdashboardcard">
            <div className='row d-flex '>
                    <div className=" col-lg-6 col-md-12 text-center mt-3 emmm" >
                      <img className="" src={posts.movieimage} alt="thisimg" width={'350'} height={'400'}/>
                    </div>
                  <div className='col-lg-6 col-md-12 emmovdets' >
                      <h1 className="m-3" style={{"fontSize":"5vw"}}>{posts.movietitle}</h1>
                      <h5 className="m-3">{posts.moviedescription}</h5>
                      <h5 className="m-3">{posts.price}</h5>
                      <div> 
                          <button className='btn rounded-pill bg-danger text-white px-3 fs-5 m-3' onClick={openVideoInNewTab}>Watch Trailer</button>
                      </div>
                      <div className='col-lg-12 col-md-12 emmm '>
                          <div className='p-1'>
                                <select name='selectedDate' className='p-2 bg-transparent text-white' onChange={handleDateChange} required>
                                    <option value="date" disabled selected> Date</option>
                                        {uniqueMovieDates.map((date, index) => (
                                          <option key={index} style={{ backgroundColor: 'black' }}>
                                            {date}
                                          </option>
                                        ))}
                                </select>
                          </div>
                            <div className='p-1'>                                
                              <select name='option1' className='p-2 bg-transparent text-white'  onChange={handleChange1} required>
                                <option value="date" disabled selected>Time</option>
                                  { movieshow.map((time, _id) => (
                                    <option key={_id} style={{ "backgroundColor": "black" }}>
                                     {time.movietime}
                                    </option>
                                  )
                                  )}
                              </select> 
                            </div>
                            <div className='p-1'>
                                <select name='selectedOption' className='p-2 bg-transparent text-white'  defaultValue={selectedOption} onChange={handleChange2} required>
                                    <option value={selectedOption} disabled selected>Theater</option>
                                        {
                                            moviecinema && moviecinema.map((dat, _id) => {
                                              if(dat.hallname){
                                                return(
                                                <option  key={_id} style={{ "backgroundColor": "black" }}>
                                                    <option className="m-1" style={{ "backgroundColor": "black" }} value={selectedOption}>{dat.hallname}</option>
                                                </option>
                                                )
                                              } return"";
                                            })
                                        }
                                </select>  
                            </div>
                      </div>
                  </div>
            </div>
          </div>
        </div>
      <div className=" w-80 m-4 justify-content-center align-content-center border rounded"> 
        {  
          selectedOption <= 0 ? none : 
          <div className=''>
                <div className='card-header text-center'>
                      <h4>Booking Details</h4>
                  </div>
          </div>
        }
          <div>
              <table className="table table-sm"> 
                    {selectedOption <= 0 ? none :               
                        <thead>
                          <tr>
                            <th scope=" text-left">Selection</th>
                            <th scope="col">Price</th>
                            <th scope="col">Seat</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Subtotal</th>
                          </tr>
                        </thead>
                      }
                  <tbody>
                    { selectedOption === 'Gold 4D' && 
                        <tr className=''>
                            <th scope="row">{gdst4d}</th>
                            <td id='goldseat4did'>₦ {goldSeat4D}</td>
                            <td> 
                                <button type="button" className="btn btn-success" onClick={Seat} >Select Seat  </button>
                            </td>
                            <td><input type="number" id='goldseat4did' value={goldseat4dsubtotal} min="0" max="50" className='w-50' onChange={e=>setgoldseat4dsubtotal(e.target.value)} />
                            </td>
                            <td>{goldseat4dtotal}</td>
                        </tr>
                      }
                      { selectedOption === 'Gold' &&
                          <tr>
                            <th scope="row">{gdst}</th>
                              <td id='goldseatid'>₦ {goldSeat}</td>
                                  <td>
                                    <button type="button" className="btn btn-success" onClick={Seat}>Select Seat </button>
                                  </td>
                                  <td>
                                      <input type="number" id="goldseatid" value={goldseatsubtotal} min="0" max="50" className='w-50' onChange={e=>setgoldseatsubtotal(e.target.value)} 
                                  />
                                  </td>
                              <td>{viptotal}</td>
                          </tr>
                        }

                        { selectedOption === 'Regular' && 
                            <tr>
                              <th scope="row">{reg}</th>
                              <td id='regularid'>₦ {regular}</td>
                              <td> 
                                  <button type="button" className="btn btn-success" onClick={Seat}>Select Seat</button>
                                  
                              </td>
                              <td><input type="number" id="regularid" value={regularsubtotal} min="0" max="50" className='w-50' onChange={e=>setregularsubtotal(e.target.value)}
                              /></td>
                              <td>{regulartotal}</td>
                            </tr>
                        }

                        { selectedOption === 'vip' && 
                            <tr>
                              <th scope="row">{vip}</th>
                              <td id='vipid'>₦ {vipprice}</td>
                              <td> 
                                  <button type="button" className="btn btn-success" onClick={Seat}>Select Seat</button>
                                  
                              </td>
                              <td><input type="number" id="vipid" value={vipsubtotal} min="0" max="50" className='w-50' onChange={e=>setvipsubtotal(e.target.value)}
                              /></td>
                              <td>{viptotal}</td>
                            </tr>
                        }

                        { goldseat4dsubtotal <=0 || goldseatsubtotal <= 0 || regularsubtotal <= 0 || vipsubtotal <= 0 ? `${none}` :
                          <tr>
                              <th scope="row"> </th>
                              <td className=''></td>
                              <td className=''></td>
                              <td className='fst-italic fw-bold'>Final Total:</td>
                              <td className=''>₦ {total}</td>
                          </tr>
                        }
                </tbody>
              </table>
              <div>
                  {seatTrue &&
                  <>
                  {sucmsg && 
                  <p className="text-center text-success"> 
                      {sucmsg} 
                  </p>
                  }
                  {errmsg && 
                        <p className="text-center text-danger"> 
                            {errmsg} 
                        </p>
                  }
                    <div className="emuserhomepageimg0">
                          <div><img src={cinemascreen} alt='cinemascreen' width={'200px'} />
                        </div>
                        <br></br>
                        <br></br>
                              <img src={emmoviechair} id='410' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                              <img src={emmoviechair} id='411' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                              <img src={emmoviechair} id='412' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                              <img src={emmoviechair} id='413' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                              <img src={emmoviechair} id='414' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      </div>
                      <div className="emuserhomepageimg0">
                          <img src={emmoviechair} id='310' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='311' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='312' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='313' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='314' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='315' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='316' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='317' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      </div>
                      <div className="emuserhomepageimg0">
                          <img src={emmoviechair} id='210' alt='emmoviechair' name='selectedID' onClick={handleclick}/>
                          <img src={emmoviechair} id='211' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='212' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='213' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='214' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='215' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='216' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='217' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='218' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='219' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                          <img src={emmoviechair} id='220' alt='emmoviechair' name='selectedID' onClick={handleclick} />
                      </div>
                    
                        {errmsg && <p className="b text-danger"> {errmsg} </p>}
                          <button type="button" className="btn m-2 bg-success text-white" onClick={handleAddId}>Add this</button>
                          <p>selected ID: {selectedID}</p>
                          <span>ID from Array: {arrId}</span>
                          <div>
                              {
                                dispArr && dispArr.map((avIds, id) => {
                                  return (
                                    <div className="" key={id}>
                                      <p>{avIds.selectedID}</p>
                                    </div>
                                  );
                                })
                              }
                          </div>
                  </>
                  } 
              </div>
              <div>
                  {selectedDate && ( <p> Date: {fff} </p> )}
              </div>
              <div>
                {option1 && ( <p>Time: {option1} </p> )}
              </div>
              <div>
                {selectedOption && ( <p>Cinema Hall: {selectedOption} </p> )}
              </div>
              <div>
                  <p>{goldseat4dsubtotal <= 0  ? `${none}` : `${sss}`}</p>
                  <p>{goldseatsubtotal <= 0  ? `${none}` : `${ggg}`}</p>
                  <p>{regularsubtotal <= 0  ? `${none}` : `${rrr}`}</p>
                  <p>{total <= 0 ? `${none}` : `The Total for the selected movies is: ₦${total}`}</p>
                      <div>
                        {
                            goldseat4dsubtotal <= 0 && goldseatsubtotal <= 0 && regularsubtotal <= 0 && selectedID <= 0
                            ? 
                              `${none}`
                            :
                            <div className='justify-content-right'>
                              <button onClick={flutterpaymm}> Click to Continue</button>
                              {errorMessage && <p className='text-danger b'>{errorMessage}</p>}
                            </div> 
                        }
                      </div>
                </div>
          </div> 
      </div> 
    </div>
    <Footer />
  </div>
  );
}

export default Moviedetails;



