import { Password } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import NoteState from '../context/notes/NoteState';
import noteContext from '../context/notes/noteContext';
import { json, useNavigate } from 'react-router-dom';
//login component
export default function Login() {
    // Set default headers for Axios to send JSON content
    const { displayAlert } = useContext(noteContext);
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    let history = useNavigate();

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
    const handleChange = (event) => { //handle input change
        const { name, value } = event.target;
        setCredentials((credentials) => {
            return { ...credentials, [name]: value };
        });
    }
    return (
        <div className='container my-3'>
            <h2 className="my-3" >Login To Use MyNotebook</h2>
            <form onSubmit={handleSubmit} col-sm-12 col-8>
                <div className="mb-3">
                    <label for="email" className="form-label">Email address</label>
                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} required minLength={5} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label for="password" name="password" className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} required minLength={8} />
                </div>
                {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary my-2" >Submit</button>
            </form>
        </div>
    )
}
