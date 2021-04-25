import React, {useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter} from 'react-router-dom';
import Routes from './routes/routes';
import {getLoginStatus} from './utils/common';
import Header from './components/Navigation/Header.component';


function App(){
  document.title = "Study Buddy";
  const [isLoggedIn, setIsLoggedIn] = useState(getLoginStatus());
  
  return (
    <div className="App" data-testid="App">
      <BrowserRouter>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} ></Header>
        <div> 
          <Routes setIsLoggedIn={setIsLoggedIn}/>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;