import React,{useState,useEffect} from 'react';
import {getUser,capitalizeFirst,login} from '../../../utils/common';
import {validateName} from '../../../utils/regex';
import {colorPalette} from '../../../utils/design';
import {apiUpdateUser} from '../../../utils/api';
import { useHistory } from "react-router-dom";
import avatar from './unknown-avatar.jpg';
import { InputGroup,InputGroupAddon,InputGroupText,Input,FormFeedback} from 'reactstrap';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';

 
function UserDetails({user,setUser}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [update, setUpdate] = useState(false);
    const [userUpdated, setUserUpdated] = useState(user);
    const [first, setFirst] = useState(capitalizeFirst(user.first));
    const [last, setLast] = useState(capitalizeFirst(user.last));
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};

    useEffect(() => {
      login(userUpdated,userUpdated.role,userUpdated.isVerified,userUpdated.isSurveyed);
      setUser(userUpdated);
    }, [userUpdated]);

    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>User Details</h5>
      <IconButton style={{float:'right'}} onClick={handleClick}>
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
              <InputGroupText>Username</InputGroupText>
            </InputGroupAddon>
            <Input disabled style={{backgroundColor:'white'}} value={user.email}/>
          </InputGroup>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Member Since</InputGroupText>
            </InputGroupAddon>
            <Input disabled style={{backgroundColor:'white'}} value={new Date(user.dateMember).getDate()+'-' + (new Date(user.dateMember).getMonth()+1) + '-'+new Date(user.dateMember).getFullYear()}/>
          </InputGroup>
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>First Name</InputGroupText>
            </InputGroupAddon>
            <Input
              value={first}
              onChange={(e) => {if (update){setFirst(e.target.value)};}}
              valid={update && validateName(first)}
              invalid={ update && first.length === 0 }
            />
          </InputGroup>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Last Name</InputGroupText>
            </InputGroupAddon>
            <Input
              value={last}
              onChange={(e) => {if (update){setLast(e.target.value)};}}
              valid={update && validateName(last)}
              invalid={ update && last.length === 0 }
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