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
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PersonIcon from '@material-ui/icons/Person';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import MailIcon from '@material-ui/icons/Mail';
import Box from '@material-ui/core/Box';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PostAddIcon from '@material-ui/icons/PostAdd';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EventNoteIcon from '@material-ui/icons/EventNote';
import {storeCurrPage} from '../Survey/Student/utils/common';

function Header({isLoggedIn,setIsLoggedIn}){ 
    const history = useHistory();
    const location = useLocation().pathname;
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

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
      <Drawer anchor={"left"} open={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)}>
        <Box minWidth={'20vw'}>
        <List>
          <ListItem button onClick={()=>history.push(`/dashboard/${getRoleLiteral()}`)}>
            <ListItemIcon><DashboardIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button hidden={getRoleLiteral()!=='student'} onClick={()=>history.push(`/match`)}>
            <ListItemIcon><CompareArrowsIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Explore My Matches"} />
          </ListItem>
          <ListItem button hidden={getRoleLiteral()!=='student'} onClick={()=>history.push(`/find-students`)}>
            <ListItemIcon><EmojiPeopleIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Find A Study Buddy"} />
          </ListItem>
          <ListItem button hidden={getRoleLiteral()!=='student'} onClick={()=>history.push(`/mass-study-invite`)}>
            <ListItemIcon><MailIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Send A Study Invite"} />
          </ListItem>
          <ListItem button hidden={getRoleLiteral()!=='student'} onClick={()=>history.push(`/find-tutors`)}>
            <ListItemIcon><LocalLibraryIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Browse Tutors"} />
          </ListItem>
          <ListItem button hidden={getRoleLiteral()!=='tutor'} onClick={()=>history.push(`/create-ad`)}>
            <ListItemIcon><PostAddIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Post An Advertisement"} />
          </ListItem>
          <ListItem button hidden={getRoleLiteral()!== 'student'} onClick={()=>history.push(`/student-help`)}>
            <ListItemIcon><ImportContactsIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Help Center"} />
          </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button onClick={()=>history.push(`/${getRoleLiteral()}-profile`)}>
            <ListItemIcon><PersonIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"My Profile"} />
          </ListItem>
        <ListItem button hidden={getRoleLiteral()!=='student'} onClick={()=>{storeCurrPage(4);history.push(`/student-survey`);}}>
            <ListItemIcon><EventNoteIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Update My Course Schedule"} />
        </ListItem>
        <ListItem button hidden={getRoleLiteral()!=='student'} onClick={()=>{storeCurrPage(0);history.push(`/student-survey`);}}>
            <ListItemIcon><QuestionAnswerIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Take Our Survey"} />
        </ListItem>
      </List>
      </Box>
      </Drawer>
    </div>
};

export default Header;