import React,{useState,useEffect} from 'react';
import {getUser,capitalizeFirst,login} from '../../../utils/common';
import {validateEmail,validatePhone,validateToken} from '../../../utils/regex';
import {colorPalette} from '../../../utils/design';
import {apiUpdateUser,apiVerify,apiToken} from '../../../utils/api';
import { useHistory } from "react-router-dom";
import avatar from './unknown-avatar.jpg';
import { InputGroup,InputGroupAddon,InputGroupText,Input,Form,FormGroup} from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import {Alert} from 'react-bootstrap';
import ReactLoading from 'react-loading';

 
function ContactInfo({user,setUser}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [update, setUpdate] = useState(false);
    const [updateType, setUpdateType] = useState('');
    const [phone, setPhone] = useState(user.phoneNumber);
    const [email, setEmail] = useState(user.email);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const [modal, setModal] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [pTag,setpTag]=useState('');
    const [loading,setLoading]=useState(false);
    const [token, setToken] = useState('');
    const [alertModal, setAlertModal] = useState(false);
    const [alertModalMessage, setAlertModalMessage] = useState('');


    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, margin:'1vw'}} show={alert} onClose={() => setAlert(false)} dismissible transition={false}>
        {alertMessage}
      </Alert>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>Contact Info</h5>
      <IconButton style={{float:'right'}} onClick={handleClick}>
        <MoreVertIcon/>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem hidden={update} onClick={() => {handleClose();setUpdate(true);setUpdateType('email');}}>Update Email</MenuItem>
        <MenuItem hidden={update} onClick={() => {handleClose();setUpdate(true);setUpdateType('phone');}}>Update Phone</MenuItem>
        <MenuItem hidden={!update || !validatePhone(phone) || !validateEmail(email)}
            onClick={async () => {
                handleClose();
                if (updateType==='email'){
                    await handleUpdateEmail(email,user,setEmail,setModal,setAlert,setAlertMessage,setpTag,setLoading);
                } else {
                    await handleUpdatePhone(phone,user,setPhone,setUser,setAlert,setAlertMessage);
                }
                setUpdate(false);
                setUpdateType('');
            }}>Save Details</MenuItem>
        <MenuItem hidden={!update} onClick={async () => {handleClose();setEmail(user.email);setPhone(user.phoneNumber);setUpdate(false);setUpdateType('');}}>Cancel Update</MenuItem>
      </Menu>
      <div style={{width:'65vw',display:'flex',alignItems: 'center',justifyContent:'space-evenly',padding:'1vw'}}>
        <div style={{margin:'1vw'}}>
          <img src={avatar} style={{height: '10vw'}}/>
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Email</InputGroupText>
            </InputGroupAddon>
            <Input
                style={{backgroundColor:'white'}}
                value={email}
                onChange={(e) => {if (updateType==='email'){setEmail(e.target.value)};}}
                valid={updateType==='email' && validateEmail(email)}
                invalid={ updateType==='email' && email.length > 0 && !validateEmail(email) }
            />
          </InputGroup>
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText>Phone</InputGroupText>
            </InputGroupAddon>
            <Input
              value={phone}
              onChange={(e) => {if (updateType==='phone'){setPhone(e.target.value)};}}
              valid={updateType==='phone' && validatePhone(phone)}
              invalid={updateType==='phone' && phone.length > 0 && !validatePhone(phone)}
            />
          </InputGroup>
            <Modal isOpen={modal} toggle={async ()=> await CancelUpdateEmail(user,setEmail,setModal,setAlert,setAlertMessage,setpTag)}>
                <ModalHeader toggle={async ()=> await CancelUpdateEmail(user,setEmail,setModal,setAlert,setAlertMessage,setpTag)}>Modal title</ModalHeader>
                    <ModalBody>
                    <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, margin:'1vw'}} show={alertModal} onClose={() => setAlertModal(false)} dismissible transition={false}>
                        {alertModalMessage}
                    </Alert>
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <ReactLoading hidden={!loading} type={"cylon"} color={"#000080"} height={'15%'} width={'15%'} /> 
                        </div>
                        <p hidden={loading} style={{marginBottom:0}}>{pTag}</p>
                        <br/>
                        <Form hidden={loading} style={{margin: "auto"}}>
                            <FormGroup>
                                <Input
                                    type="text"
                                    name="token"
                                    placeholder="Token"
                                    value={token}
                                    onChange={(e) => {setToken(e.target.value)}}
                                    valid={validateToken(token)}
                                    invalid={token.length > 0 && !validateToken(token)}
                                    style={{borderRadius:14}}    
                                />
                            </FormGroup> 
                        </Form>
                        <Button 
                            size="md"
                            style={{backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'40%',borderRadius:14}} 
                            hidden={loading}
                            onClick={async () => {
                                await handleEmailVerify(token,user,setAlertModal,setAlertModalMessage,setModal,setEmail,setAlert,setAlertMessage,setpTag,email,setUser);
                            }}
                            disabled={!validateToken(token)}
                        > Confirm My Email
                        </Button>
                   </ModalBody>
            </Modal>
        </div>
      </div>
    </div>
};

async function handleUpdateEmail(email,user,setEmail,setModal,setAlert,setAlertMessage,setpTag,setLoading){
  try{
      if (email !== user.email){
        const body1 = {"email":email,'isVerified':false}
        const data1 = await apiUpdateUser(user._id,body1);
        setLoading(true);
        setModal(true);
        const body2 = {"email":email}
        const data2 = await apiVerify(body2);
        setLoading(false);
        setpTag(data2.data.msg);
        
      }else{
        setEmail(user.email);
      }  
  } catch (error){
    console.log(error);
    if (error.response.data.code === 11000){
        setAlert(true);
        setAlertMessage('The email you entered is already associated with a different account.');
        setEmail(user.email);
    }
  };
};

async function CancelUpdateEmail(user,setEmail,setModal,setAlert,setAlertMessage,setpTag){
    try{
        setModal(false);
        setpTag('');
        const body = {"email":user.email}
        const data = await apiUpdateUser(user._id,body);
        setEmail(user.email);
    } catch (error){
        setAlert(true);
        setAlertMessage('Oops... Something went wrong');
    }
};

async function handleEmailVerify(token,user,setAlertModal,setAlertModalMessage,setModal,setEmail,setAlert,setAlertMessage,setpTag,email,setUser){
    try{
        const body = {"token":token,"_userId":user._id}
        const data = await apiToken(body);
        setModal(false);
        if (data){
            const newUser = JSON.parse(getUser());
            newUser.email = email;
            login(newUser,newUser.role,newUser.isVerified,newUser.isSurveyed);
            setUser(newUser);
          } else {
            CancelUpdateEmail(user,setEmail,setModal,setAlert,setAlertMessage,setpTag);
        }
    } catch (error){
      console.log(error);
      if (error.response.status === 401){
        setAlertModal(true);
        setAlertModalMessage('Your token is incorrect or expired. Please try again.')
    } else if (error.response.status === 402) {
        setAlertModal(true);
        setAlertModalMessage("We were unable to find a user for this token.")
        CancelUpdateEmail(user,setEmail,setModal,setAlert,setAlertMessage,setpTag);
    } else {
        setAlertModal(true);
        setAlertModalMessage("Oops... Something Went Wrong");
        CancelUpdateEmail(user,setEmail,setModal,setAlert,setAlertMessage,setpTag);
    }
    };
};

async function handleUpdatePhone(phone,user,setPhone,setUser,setAlert,setAlertMessage){
    try{
        if (phone !== user.phoneNumber){
          const body1 = {"phoneNumber":phone}
          const data1 = await apiUpdateUser(user._id,body1);
          if (data1){
            const newUser = JSON.parse(getUser());
            newUser.phoneNumber = phone;
            login(newUser,newUser.role,newUser.isVerified,newUser.isSurveyed);
            setUser(newUser);
          } else {
            setPhone(user.phoneNumber);
          }
        }else{
            setPhone(user.phoneNumber);
        }  
    } catch (error){
      console.log(error);
        setAlert(true);
        setAlertMessage("Oops... Something Went Wrong");
        setPhone(user.phoneNumber);
    };
};
 
export default ContactInfo;