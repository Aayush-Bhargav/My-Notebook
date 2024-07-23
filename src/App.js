import React, { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState.js';
import Alert from './components/Alert.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import NoteContext from './context/notes/noteContext.js'
import Footer from './components/Footer.jsx';


function App() {

  return (
    <NoteState>
      <Router>
        <Navbar title="My Notebook" />
        <div style={{ height: "50px" }}>
          <AlertWrapper />
        </div>

        <div className='container' style={{ minHeight: "80vh" }}>
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
export default App;
