import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import {getRoleLiteral} from '../../utils/common';
import { useHistory } from "react-router-dom";
import ScheduleIcon from '@material-ui/icons/Schedule';
import PersonIcon from '@material-ui/icons/Person';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import {colorPalette} from '../../utils/design';

function NavDrawer({isOpenDrawer,setIsOpenDrawer,isLoggedIn,isHome}){
    const history = useHistory();
    return <div hidden={!isLoggedIn || isHome}>
        <Drawer anchor={"left"} open={isOpenDrawer} onClose={()=>setIsOpenDrawer(false)}>
        <List>
          <ListItem button onClick={()=>history.push(`/dashboard/${getRoleLiteral()}`)}>
            <ListItemIcon><DashboardIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <ListItem button onClick={()=>history.push(`/dashboard/${getRoleLiteral()}`)}>
            <ListItemIcon><PersonIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"My Profile"} />
          </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button onClick={()=>history.push(`/dashboard/${getRoleLiteral()}`)}>
            <ListItemIcon><ImportContactsIcon style={{ color: colorPalette.secondary }}/></ListItemIcon>
            <ListItemText primary={"UNC Help Center"} />
        </ListItem>
      </List>
        </Drawer>
    </div>
};

export default NavDrawer;