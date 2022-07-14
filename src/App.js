import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { useState } from 'react';
import Admin from './Admin';
import Sponsor from './Sponsor';

function App() {

const [logged_in, setLoggedIn] = useState(function(){
  return localStorage.getItem('logged_in');
});

  return (
    <div className="App">
      <BrowserRouter>
        <Header set={setLoggedIn} />
        <Routes>
              <Route path="/login" element={ !logged_in ? <Login set={setLoggedIn} /> : <Navigate to="/home" />} />
              <Route path="/register" element={ !logged_in ? <Register set={setLoggedIn} /> : <Navigate to="/home" />} />

              <Route path="/home" element={logged_in ? <Home set={setLoggedIn} /> : <Navigate to="/login" />} />
              <Route path="/sponsor" element={logged_in ? <Sponsor set={setLoggedIn} /> : <Navigate to="/login" />} />
   
              <Route path={localStorage.getItem('Email') == 'shrikunj.vyas@darwinpgc.com' ? "/admin" : "/home"} element={logged_in ? <Admin set={setLoggedIn} /> : <Navigate to="/login" />} />
                
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
