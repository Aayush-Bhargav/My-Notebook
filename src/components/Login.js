import { Password } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import NoteState from '../context/notes/NoteState';
import noteContext from '../context/notes/noteContext';
import { json, useNavigate } from 'react-router-dom';
import { UilEnvelope } from '@iconscout/react-unicons'
import { UilLock } from '@iconscout/react-unicons'
import { UilEyeSlash } from '@iconscout/react-unicons'
import { UilEye } from '@iconscout/react-unicons'
import { NavLink } from 'react-router-dom';
//login component
export default function Login() {
    // Set default headers for Axios to send JSON content
    const { displayAlert,setTheUser } = useContext(noteContext);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    let history = useNavigate();
    const [show, setShow] = useState(false);
    const host = "http://localhost:5000"
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    async function loginUser(email, password) {//function to add a note USING our backend api
        let response;
        try {
            response = await axios.post(`${host}/api/auth/login`, { email, password }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log(response);
            setTheUser(response.data.name);//set the user
            //if it is still here, it means login success
            displayAlert('Login Successful!', 'success');
            //save the authtoken and redirect
            localStorage.setItem('token', response.data.authtoken);

            history("/");
        } catch (error) {
            console.error('Error posting data:', error.response);
            displayAlert('Invalid Credentials. Try Again', 'danger');
        }
    }
    const handleSubmit = async (e) => { //handle form submission
        e.preventDefault();
        await loginUser(credentials.email, credentials.password);

    }
    const toggleShow = () => {//for showing or hiding the password
        setShow(!show);
    }
    const handleChange = (event) => { //handle input change
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
                            <span className='poppins-semibold title '>Login To MyNotebook</span>

                            <form onSubmit={handleSubmit} col-sm-12 col-8>
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
                                <div className='input-field button'>
                                    <input type="submit" value="Login" />
                                </div>
                            </form>
                            <div className='login-signup'>
                                <span className='text'>New to My Notebook?<NavLink to="/signup" className='text signup-text'> Sign Up Now</NavLink>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
