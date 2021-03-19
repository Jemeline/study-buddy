import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './routes/Routes.jsx';
import { Button } from 'react-bootstrap';
import { withFirebase } from './utils/Firebase';

const App = ({ Firebase }) => {
  const logout = async () => await Firebase.logout();

  return (
    <div className="App">
      <Router>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/recover">Recover password</Link></li>
        <li><Link to="/protectedroute">Protected Component (Protected)</Link></li>
        <li><Link to="/student/dashboard">Student Dashboard (Student Claim)</Link></li>
        <li><Link to="/tutor/dashboard">Tutor Dashboard (Tutor Claim)</Link></li>
        <li><Link to="/admin/dashboard">Admin Dashboard (Admin Claim)</Link></li>
        <li><Link to="/admin/newAdmin">New Admin (Admin Claim)</Link></li>
        <Button as={Link} onClick={logout} to="/login">Logout</Button>
        <Routes />
      </Router>
    </div>
  );
};

export default withFirebase(App);