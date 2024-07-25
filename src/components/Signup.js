import { Password } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import NoteState from '../context/notes/NoteState';
import noteContext from '../context/notes/noteContext';
import { json, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { UilEnvelope } from '@iconscout/react-unicons'
import { UilLock } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'
import { UilEye } from '@iconscout/react-unicons'
import { UilUser } from '@iconscout/react-unicons';
//sign up component
export default function Login() {
  // Set default headers for Axios to send JSON content
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  const { displayAlert } = useContext(noteContext);
  let history = useNavigate();
  const[show,setShow]=useState(false);
  const toggleShow = () => {//for showing or hiding the password
    setShow(!show);
}
  const host = "http://localhost:5000"
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  async function createUser(name, email, password) {//function to add a note USING our backend api
    let response;
    console.log(name,email,password)
    try {
      response = await axios.post(`${host}/api/auth/createUser`, { name, email, password }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log(response);
      //if it is still here, it means sign up success
      displayAlert("Welcome aboard! Account Created Successfully!", 'success');
      //save the authtoken and redirect
      localStorage.setItem('token', response.data.authtoken);
      history("/");
    } catch (error) {
      displayAlert("Couldn't Sign Up. Use a stronger password(Atleast 1 uppercase,1 lowercase, 1 number). Try again.", 'danger');
      console.error('Error posting data:', error.response);
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword)//if password and confirm password are the same
      await createUser(credentials.name, credentials.email, credentials.password);
    else {
      displayAlert("Password's don't match. Try again", 'warning');
    }

  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((credentials) => {
      return { ...credentials, [name]: value };
    });
  }
  return (
    <>
    <div style={{ minHeight: "80vh" ,display:"flex",alignItems:"center"}}>
                <div className='login-container my-5' >
                    <div className='forms'>
                        <div className='form login'>
                            <span className='poppins-semibold title '>Register To MyNotebook</span>
                            <form onSubmit={handleSubmit} col-sm-12 col-8>
                            <div className="input-field">
                                    <input type="name" name="name" placeholder="Enter your name" id="name"  onChange={handleChange} value={credentials.name} required minLength={3} /><UilUser className="icon" />
                                </div>
                                <div className="input-field">
                                    <input type="email" name="email" placeholder="Enter your email" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} required minLength={5} /><UilEnvelope className="icon" />
                                </div>
                                <div className="input-field">
                                    <input type={show ? "text" : "password"} name="password" placeholder="Enter your password" id="password" onChange={handleChange} value={credentials.password} required minLength={8} /><UilLock className="icon" />
                                    {!show && <UilEyeSlash className='eye' onClick={() => {
                                        toggleShow();
                                    }} />}
                                    {show && <UilEye className='eye' onClick={() => {
                                        toggleShow();
                                    }} />}
                                </div>
                                <div className="input-field">
                                    <input type={show ? "text" : "password"} name="cpassword" placeholder="Confirm your password" id="cpassword" onChange={handleChange} value={credentials.cpassword} required minLength={8} /><UilLock className="icon" />
                                    {!show && <UilEyeSlash className='eye' onClick={() => {
                                        toggleShow();
                                    }} />}
                                    {show && <UilEye className='eye' onClick={() => {
                                        toggleShow();
                                    }} />}
                                </div>
                                <div className='input-field button'>
                                    <input type="submit" value="Register" />
                                </div>
                            </form>
                            <div className='login-signup'>
                                <span className='text'>Already have an account?<NavLink to="/login" className='text signup-text'> Login Now</NavLink>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


    </>
  )
}
