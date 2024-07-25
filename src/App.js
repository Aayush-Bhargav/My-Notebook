import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState.js';
import Alert from './components/Alert.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import NoteContext from './context/notes/noteContext.js'
import Footer from './components/Footer.jsx';


function App() {

  return (
    <NoteState>
      <Router>
        <NavbarWrapper/>
        <div style={{ height: "50px" }}>
          <AlertWrapper />
        </div>

        <div className='container' style={{ minHeight: "83vh" }}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
          </Routes>
        </div>
        <Footer />
      </Router>

    </NoteState>
  );
}
const AlertWrapper = () => {
  const { alert, showAlert } = useContext(NoteContext);
  return showAlert ? <Alert alert={alert} /> : null;
};
const NavbarWrapper = () => {
  const location = useLocation();
  const currentPath = location.pathname;//only if current location is this , then set login prop to false so it shows the logout button
  if (currentPath === '/login' || currentPath === '/signup')
    return <Navbar loggedIn={false} title="My Notebook"/>;
  else 
    return <Navbar loggedIn={true} title="My Notebook"/>;
  
};
export default App;
