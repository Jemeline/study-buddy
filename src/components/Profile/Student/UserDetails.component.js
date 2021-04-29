import React,{useState,useEffect} from 'react';
import {getUser,capitalizeFirst,login} from '../../../utils/common';
import {validateName} from '../../../utils/regex';
import {apiUpdateUser,apiUpdateAvatar} from '../../../utils/api';
import { useHistory } from "react-router-dom";
import avatarUnknown from './unknown-avatar.jpg';
import { Button,InputGroup,InputGroupAddon,InputGroupText,Input,Modal, ModalHeader, ModalBody} from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {colorPalette} from '../../../utils/design';
import {Alert} from 'react-bootstrap';
import ReactLoading from 'react-loading';

function UserDetails({user,setUser,hidden}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [update, setUpdate] = useState(false);
    const [updateType, setUpdateType] = useState('');
    const [first, setFirst] = useState(capitalizeFirst(user.first));
    const [last, setLast] = useState(capitalizeFirst(user.last));
    const [uploadAvatar, setUploadAvatar] = useState(null);
    const [avatar, setAvatar] = useState('');
    const [testAvatar, setTestAvatar] = useState('');
    const [currentAvatar, setCurrentAvatar] = useState('');
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState(false);

    useEffect(async () => {
      try{
        setLoading(true);
        setError(false);
        const data = await apiUpdateUser(user._id,{});
        if (data.data != null) {
          setAvatar(data.data.avatar);
          setCurrentAvatar(data.data.avatar);
          setLoading(false);
        } else {
          setError(true);
        }  
      } catch (err){
        setError(true);
      }  
    }, []);

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
        <MenuItem hidden={update} onClick={() => {handleClose();setUpdate(true);setUpdateType('details');}}>Update Details</MenuItem>
        <MenuItem hidden={update} onClick={() =>{handleClose();setUpdate(true);setUpdateType('avatar');setModal(true);}}>Update Avatar</MenuItem>
        <MenuItem hidden={update} onClick={async () =>{handleClose();await handleRemoveAvatar(user,setAvatar,currentAvatar,setAlert);}}>Remove Avatar</MenuItem>
        <MenuItem hidden={!update || !validateName(first) || !validateName(last)} 
          onClick={async () => {
            handleClose();
            if (updateType==='details'){
              await handleUpdate(first,last,user,setFirst,setLast,login,setUser);
            } else {
              
            }
            setUpdate(false);
            setUpdateType('');
            setModal(false);
            setAlert(false);
        }}>Save Details</MenuItem>
        <MenuItem hidden={!update} 
          onClick={async () => {
            handleClose();
            if (updateType==='details'){
              setFirst(capitalizeFirst(user.first));
              setLast(capitalizeFirst(user.last));
            } else {
              setAvatar(currentAvatar);
            }
            setUpdate(false);
            setModal(false);
            setAlert(false);
          }}>Cancel Update</MenuItem> 
      </Menu>
      <Modal isOpen={modal} toggle={()=> {setModal(false);setUpdate(false);setAlert(false);}}>
        <ModalHeader toggle={()=> {setModal(false);setUpdate(false);setAlert(false);}}>Update My Avatar</ModalHeader>
            <ModalBody>
                <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14}} show={alert} onClose={() => setAlert(false)} dismissible transition={false}>
                    Sorry... We could not update your avatar at this time. Please try again.
                </Alert>
                  <form>
                  <Input onChange={(e)=>{setUploadAvatar(e.target.files[0]);setTestAvatar(URL.createObjectURL(e.target.files[0]))}} type="file" accept=".jpg,.jpeg,.png"/>
                    <div style={{margin:'1vw',display: 'flex', justifyContent: 'center'}}>
                    <img src={testAvatar} style={{maxHeight: '20vw',maxWidth:"20vw"}}/>
                    </div>
                    <Button 
                      size="md"
                      style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'50%',borderRadius:14}} 
                      onClick={async () => await handleUpdateAvatar(uploadAvatar,user,setUser,setAvatar,testAvatar,currentAvatar,setModal,setAlert,setUpdate)}
                    > Update My Avatar
                    </Button>
                  </form>
            </ModalBody>
      </Modal>
      <div style={{width:'65vw',display:'flex',alignItems: 'center',justifyContent:'space-evenly',padding:'1vw'}}>
        <div style={{margin:'1vw',display: 'flex', justifyContent: 'center'}}>
          {(loading)?
          <ReactLoading hidden={!loading} type={"cylon"} color={colorPalette.secondary} height={'10%'} width={'10%'} /> :
          (!avatar)?<img src={avatarUnknown} style={{height:'10vw',width: '10vw'}}/>:
          <img src={avatar} style={{maxHeight:'10vw',maxWidth: '10vw',objectFit:'cover'}}/>
          }
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

async function handleUpdateAvatar(uploadAvatar,user,setUser,setAvatar,testAvatar,currentAvatar,setModal,setAlert,setUpdate){
  setAlert(false);
  try{
    let fd = new FormData();
    fd.append("upload_preset", 'acfkbiiu');
    fd.append("file", uploadAvatar);
    const config = {headers: { "X-Requested-With": "XMLHttpRequest" }};
    const data = await apiUpdateAvatar(fd,config);
    
    const body = {"avatar":await data.data.secure_url}
    const dataUpdate = await apiUpdateUser(user._id,body);
    const newUser = JSON.parse(getUser());
    setAvatar(testAvatar);
    setModal(false);
    setUpdate(false);
  } catch (error){
    setAlert(true);
    setAvatar(currentAvatar);
    console.log(error);
  };
};

async function handleRemoveAvatar(user,setAvatar,currentAvatar,setAlert){
  setAlert(false);
  try{
    const body = {"avatar":''}
    const dataUpdate = await apiUpdateUser(user._id,body);
    const newUser = JSON.parse(getUser());
    setAvatar('');
  } catch (error){
    setAlert(true);
    setAvatar(currentAvatar);
    console.log(error);
  };
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