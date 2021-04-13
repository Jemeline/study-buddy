import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {colorPalette} from '../../utils/design';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';
import {getRoleLiteral,logout} from '../../utils/common';
import { useHistory,useLocation } from "react-router-dom";



function Header({isLoggedIn,setIsLoggedIn,setIsOpenDrawer}){ 
    const history = useHistory();
    const location = useLocation().pathname;

    return <div hidden={!isLoggedIn || (location==='/auth') || (location==='/')} style={{flexGrow: 1}}>
      <AppBar position="static" style={{ background: colorPalette.secondaryA,height:'65px'}}>
        <Toolbar>
          <IconButton edge="start" style={{ background: colorPalette.secondaryA }}
            onClick={() => {
              setIsOpenDrawer(true);
            }}>
            <MenuIcon style={{ color: colorPalette.white }}/>
          </IconButton>
          <Typography variant="h6" style={{flexGrow: 1,textAlign: "left"}}>
            Study Buddy
          </Typography>
          <IconButton hidden={!isLoggedIn} onClick={() => {history.push(`/${getRoleLiteral()}-profile`)}}>
            <AccountCircle style={{ color: colorPalette.white }}/>
          </IconButton>
          <Button 
              as={Link}
              hidden={!isLoggedIn}
              style={{ color: colorPalette.white }}
              onClick={() => {
                  logout();
                  setIsLoggedIn(false);
                  history.push('/auth');
              }}
              to="/auth">Sign Out
          </Button>
        </Toolbar>
      </AppBar>
    </div>
};

export default Header;