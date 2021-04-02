import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {colorPalette} from '../../utils/design';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import {Link} from 'react-router-dom';
import {logout} from '../../utils/common';
import { useHistory } from "react-router-dom";


function Header({isLoggedIn,setIsLoggedIn,setIsOpenDrawer,isHome}){ 
  const history = useHistory();

    return <div hidden={!isLoggedIn || isHome} style={{flexGrow: 1}}>
      <AppBar position="static" style={{ background: colorPalette.secondaryA }}>
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
          <IconButton hidden={!isLoggedIn}>
              <Badge badgeContent={4} color="primary">
                <MailIcon style={{ color: colorPalette.white }}/>
              </Badge>
            </IconButton>
            <IconButton hidden={!isLoggedIn}>
              <Badge badgeContent={17} color="primary">
                <NotificationsIcon style={{ color: colorPalette.white }}/>
              </Badge>
            </IconButton>
            <IconButton hidden={!isLoggedIn}>
              <AccountCircle style={{ color: colorPalette.white }}/>
            </IconButton>
            <Button
                hidden={isLoggedIn}
                style={{ background: colorPalette.white }}
                onClick={() => {
                    history.push('/');
                }}
                >Sign In</Button>
            <Button 
                as={Link}
                hidden={!isLoggedIn}
                style={{ color: colorPalette.white }}
                onClick={() => {
                    logout();
                    setIsLoggedIn(false);
                    history.push('/');
                }}
                to="/">Sign Out
            </Button>
        </Toolbar>
      </AppBar>
    </div>
};

export default Header;