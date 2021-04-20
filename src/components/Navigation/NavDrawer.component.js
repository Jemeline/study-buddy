import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import {getRoleLiteral} from '../../utils/common';
import { useHistory,useLocation } from "react-router-dom";
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import PersonIcon from '@material-ui/icons/Person';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import {colorPalette} from '../../utils/design';

function NavDrawer({isOpenDrawer,setIsOpenDrawer,isLoggedIn}){
    const history = useHistory();
    const location = useLocation().pathname;

    return <div hidden={!isLoggedIn || (location==='/auth') || (location==='/')}>
        <Drawer anchor={"left"} open={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)}>
        <List>
          <ListItem button onClick={()=>history.push(`/dashboard/${getRoleLiteral()}`)}>
            <ListItemIcon><DashboardIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button onClick={()=>history.push(`/${getRoleLiteral()}-profile`)}>
            <ListItemIcon><PersonIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"My Profile"} />
          </ListItem>
          <ListItem button onClick={()=>history.push(`/find-students`)}>
            <ListItemIcon><EmojiPeopleIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Find A Study Buddy"} />
          </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button onClick={()=>history.push(`/${getRoleLiteral()}-help`)}>
            <ListItemIcon><ImportContactsIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"UNC Help Center"} />
        </ListItem>
      </List>
        </Drawer>
    </div>
};

export default NavDrawer;