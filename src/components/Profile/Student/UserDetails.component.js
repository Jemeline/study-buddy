import React,{useState} from 'react';
import {getUser,capitalizeFirst,login} from '../../../utils/common';
import {validateName} from '../../../utils/regex';
import {apiUpdateUser} from '../../../utils/api';
import { useHistory } from "react-router-dom";
import avatar from './unknown-avatar.jpg';
import { InputGroup,InputGroupAddon,InputGroupText,Input} from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

 
function UserDetails({user,setUser,hidden}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [update, setUpdate] = useState(false);
    const [first, setFirst] = useState(capitalizeFirst(user.first));
    const [last, setLast] = useState(capitalizeFirst(user.last));
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};

    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>User Details</h5>
      <IconButton hidden={hidden} style={{float:'right'}} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem hidden={update} onClick={() => {handleClose();setUpdate(true);}}>Update Details</MenuItem>
        <MenuItem hidden={!update || !validateName(first) || !validateName(last)} onClick={async () => {handleClose();await handleUpdate(first,last,user,setFirst,setLast,login,setUser);setUpdate(false);}}>Save Details</MenuItem>
        <MenuItem hidden={!update} onClick={async () => {handleClose();setFirst(capitalizeFirst(user.first));setLast(capitalizeFirst(user.last));setUpdate(false);}}>Cancel Update</MenuItem>
        <MenuItem onClick={() =>handleClose()}>Update Avatar</MenuItem>
      </Menu>
      <div style={{width:'65vw',display:'flex',alignItems: 'center',justifyContent:'space-evenly',padding:'1vw'}}>
        <div style={{margin:'1vw'}}>
          <img src={avatar} style={{height: '10vw'}}/>
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Username</InputGroupText>
            </InputGroupAddon>
            <Input disabled style={{backgroundColor:'white',fontSize:'1.2vw'}} value={user.email}/>
          </InputGroup>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Member Since</InputGroupText>
            </InputGroupAddon>
            <Input disabled style={{backgroundColor:'white',fontSize:'1.2vw'}} value={new Date(user.dateMember).getDate()+'-' + (new Date(user.dateMember).getMonth()+1) + '-'+new Date(user.dateMember).getFullYear()}/>
          </InputGroup>
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>First Name</InputGroupText>
            </InputGroupAddon>
            <Input
              value={first}
              onChange={(e) => {if (update){setFirst(e.target.value)};}}
              valid={update && validateName(first)}
              invalid={update && !validateName(first)}
              style={{backgroundColor:'white',fontSize:'1.2vw'}}
              disabled={!update}
            />
          </InputGroup>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Last Name</InputGroupText>
            </InputGroupAddon>
            <Input
              value={last}
              onChange={(e) => {if (update){setLast(e.target.value)};}}
              valid={update && last.length !== 0 && validateName(last)}
              invalid={update && !validateName(last)}
              style={{backgroundColor:'white',fontSize:'1.2vw'}}
              disabled={!update}
            />
          </InputGroup>
        </div>
      </div>
    </div>
};

async function handleUpdate(first,last,user,setFirst,setLast,login,setUser){
  try{
    const body = {"first":first,"last":last}
    const data = await apiUpdateUser(user._id,body);
    if (data){
      const newUser = JSON.parse(getUser());
      newUser.first = first;
      newUser.last = last;
      login(newUser,newUser.role,newUser.isVerified,newUser.isSurveyed);
      setUser(newUser);
    } else {
      setFirst(capitalizeFirst(user.first));
      setLast(capitalizeFirst(user.last));
    }
  } catch (error){
    console.log(error);
    setFirst(capitalizeFirst(user.first));
    setLast(capitalizeFirst(user.last));
  };
};
 
export default UserDetails;