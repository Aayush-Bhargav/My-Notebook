import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HomeIcon from '@mui/icons-material/Home';
import { UilUser } from '@iconscout/react-unicons';
import LogoutIcon from '@mui/icons-material/Logout';
export default function Navbar(props) {
    const { displayAlert } = useContext(noteContext);
    const location = useLocation();
    const history = useNavigate();
    const handleLogout = () => {
        displayAlert('Logged Out Successfully!', 'success');
        localStorage.removeItem('token');
        history("/login");
    }
    useEffect(() => {
        console.log(location)
    }, [location]);
    return (
        <nav className="navbar navbar-expand-lg " style={{ backgroundColor: "#f5ba13", color: "#fff" }}>
            <div className="container-fluid">
                <AutoStoriesIcon style={{margin:"5px",marginRight:"10px"}}/><NavLink style={{ color: "white" ,fontSize:"20px",fontWeight:"bold"}} className="navbar-brand" to="/">{props.title}</NavLink>
                <button className="navbar-toggler" style={{ color: "white" }} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {props.loggedIn && <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink style={{ color: "white" }} className={`nav-link {location.pathname==='/'?"active":""}`} aria-current="page" to="/"><HomeIcon style={{position:"relative",top:"-3px",marginRight:"5px"}}/>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <form className="d-flex" role="search">
                                <NavLink style={{ color: "white" }} className={`nav-link {location.pathname==='/'?"active":""}`} to="/login" onClick={handleLogout} aria-current="page"><LogoutIcon/>Logout</NavLink></form>
                        </li>
                        {/* (<button className="btn btn-primary  my-2" onClick={handleLogout}>Logout</button>) */}

                    </ul>}
                    {
                        !props.loggedIn && (<div className='login-signup-holder'><form className="d-flex" role="search">


                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item"><NavLink style={{ color: "white" }} className={`nav-link {location.pathname==='/'?"active":""}`} to="/login" role="button"><UilUser></UilUser>Login</NavLink></li>
                                <li className="nav-item"><NavLink style={{ color: "white" }} className={`nav-link {location.pathname==='/'?"active":""}`} to="/signup" role="button"><UilUser></UilUser>Sign Up</NavLink></li>

                            </ul>

                        </form></div>)
                    }
                </div>
            </div>
        </nav>
    )
}
