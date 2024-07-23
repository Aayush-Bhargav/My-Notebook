import { Password } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import NoteState from '../context/notes/NoteState';
import noteContext from '../context/notes/noteContext';
import { json, useNavigate } from 'react-router-dom';
//sign up component
export default function Login() {
  // Set default headers for Axios to send JSON content
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  const { displayAlert } = useContext(noteContext);
  let history = useNavigate();

  const host = "http://localhost:5000"
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  async function createUser(name, email, password) {//function to add a note USING our backend api
    let response;
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
      displayAlert("Couldn't Sign Up. Try again.", 'danger');
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
    <div className='container my-3'>
     <h2 className='my-3' style={{textAlign:"center"}}>Create your MyNotebook Account Today!</h2>
      <form onSubmit={handleSubmit} col-sm-12 col-8>
        <div className="mb-3">
          <label for="name" className="form-label">Name</label>
          <input type="text" name="name" className="form-control" id="name" onChange={handleChange} value={credentials.name} required minLength={5} />
        </div>
        <div className="mb-3">
          <label for="email" className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleChange} value={credentials.email} required minLength={5} />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="password" name="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" onChange={handleChange} value={credentials.password} required minLength={8} />
        </div>
        <div className="mb-3">
          <label for="cpassword" name="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={handleChange} value={credentials.cpassword} required minLength={8} />
        </div>
        {/* <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}
