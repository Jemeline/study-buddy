import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link} from 'react-router-dom';
import Routes from './routes/routes';
import {Button} from 'react-bootstrap';
import {logout} from './utils/common';

function App(){
  document.title = "Study Buddy";
  return (
    <div className="App">
      <BrowserRouter>
        <li><Link to="/dashboard/student">Student Dashboard (protected)</Link></li>
        <li><Link to="/dashboard/tutor">Tutor Dashboard (protected)</Link></li>
        <li><Link to="/dashboard/admin">Admin Dashboard (protected)</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/recover">Recover Password</Link></li>
        <Button as={Link} onClick={() => {logout()}} to="/login">Logout</Button>
        <div> 
          <Routes/>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;