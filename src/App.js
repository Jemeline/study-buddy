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
  const [isHome, setIsHome] = useState(false);
  
  
  return (
    <div className="App" data-testid="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} isHome={isHome} setIsLoggedIn={setIsLoggedIn} setIsOpenDrawer={setIsOpenDrawer}></Header>
        <NavDrawer isOpenDrawer={isOpenDrawer} isHome={isHome} setIsOpenDrawer={setIsOpenDrawer} isLoggedIn={isLoggedIn}/>
        <div> 
          <Routes setIsLoggedIn={setIsLoggedIn} setIsHome={setIsHome}/>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;