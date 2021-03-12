import React, {useState,useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link} from 'react-router-dom';
import Routes from './routes/routes';
import {getLoginStatus} from './utils/common';
import Header from './components/Navigation/Header.component';
import NavDrawer from './components/Navigation/NavDrawer.component';


function App(){
  document.title = "Study Buddy";
  const [isLoggedIn, setIsLoggedIn] = useState(getLoginStatus());
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);  
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setIsOpenDrawer={setIsOpenDrawer}></Header>
        <NavDrawer isOpenDrawer={isOpenDrawer} setIsOpenDrawer={setIsOpenDrawer} isLoggedIn={isLoggedIn}/>
        <div> 
          <br></br>
          <Routes setIsLoggedIn={setIsLoggedIn}/>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;