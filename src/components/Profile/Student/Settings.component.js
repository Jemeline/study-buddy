import React,{useState} from 'react';
import {getUser,login,logout} from '../../../utils/common';
import {apiDeleteUser,apiUpdateUser,apiUpdatePassword} from '../../../utils/api';
import { useHistory } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import ButtonMUI from '@material-ui/core/Button';
import { Button,Modal, ModalHeader, ModalBody,Form,FormGroup,Input,FormFeedback} from 'reactstrap';
import {validatePassword,validatePasswordLiteral} from '../../../utils/regex';
import {colorPalette} from '../../../utils/design';
import {Alert} from 'react-bootstrap';

function Settings({user,setUser,hidden}) {
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [update, setUpdate] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [deleteAccount, setDeleteAccount] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [disabled, setDisabled] = useState(user.disabled);
    const handleClick = (event) => {setAnchorEl(event.currentTarget);};
    const handleClose = () => {setAnchorEl(null);};
    const [modal, setModal] = useState(false);
    const [alertDelete, setAlertDelete] = useState(false);
    const [alertPassword, setAlertPassword] = useState(false);
    const [alertPasswordMessage, setAlertPasswordMessage] = useState(false);
    const [alertPasswordSuccess, setAlertPasswordSucess] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const dismissAlerts= () => {
        setAlertDelete(false);
        setAlertPasswordSucess(false);
        setAlertPassword(false);
      };

    return <div  hidden={hidden} style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>Settings</h5>
      <IconButton hidden={hidden} style={{float:'right'}} onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem hidden={update} onClick={() => {handleClose();setModal(true);setUpdate(true);}}>Update Password</MenuItem>
      </Menu>
      <Modal isOpen={modalDelete} toggle={()=> {setModalDelete(false);setUpdate(false);dismissAlerts();}}>
        <ModalHeader toggle={()=> {setModalDelete(false);setUpdate(false);dismissAlerts();}}>Delete My Account</ModalHeader>
            <ModalBody>
                <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, margin:'1vw'}} show={alertDelete} onClose={() => setAlertDelete(false)} dismissible transition={false}>
                    Sorry... We could not delete your account at this time. Please try again.
                </Alert>
                Type "delete" to confirm you account deletion
                <Input
                    type="text"
                    value={deleteAccount}
                    onChange={(e) => {setDeleteAccount(e.target.value)}}
                    valid={deleteAccount.length > 0 && deleteAccount.toLowerCase() === 'delete'}
                    invalid={deleteAccount.length > 0 && !(deleteAccount.toLowerCase() === 'delete')}
                    style={{borderRadius:14}}    
                />
                <br/>
                <Button 
                    size="md"
                    style={{float:'left',backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'40%',borderRadius:14}} 
                    onClick={async () => {
                        await handleDeleteAccount(user,setAlertDelete,history,dismissAlerts);
                    }}
                    disabled={!(deleteAccount.toLowerCase() === 'delete')}
                > Delete My Account
                </Button>
            </ModalBody>
      </Modal>
      <Modal isOpen={modal} toggle={()=> {setModal(false);setUpdate(false);dismissAlerts();}}>
        <ModalHeader toggle={()=> {setModal(false);setUpdate(false);dismissAlerts();}}>Update My Password</ModalHeader>
            <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, margin:'1vw'}} show={alertPassword} onClose={() => setAlertPassword(false)} dismissible transition={false}>
                    {alertPasswordMessage}
            </Alert>
            <Alert style={{backgroundColor:colorPalette.primary,borderRadius:14, margin:'1vw'}} show={alertPasswordSuccess} onClose={() => setAlertPasswordSucess(false)} dismissible transition={false}>
                    Success! Your password has been updated.
            </Alert>
            <ModalBody>
            <Form style={{margin: "auto"}}>
                <FormGroup>
                    <Input
                        type="password"
                        value={oldPassword}
                        placeholder="Current Password"
                        onChange={(e) => {setOldPassword(e.target.value)}}
                        valid={validatePassword(oldPassword)}
                        invalid={oldPassword.length > 0 && !validatePassword(oldPassword)}
                        style={{borderRadius:14}}    
                    />
                    <FormFeedback>
                      {validatePasswordLiteral(oldPassword)}
                    </FormFeedback>
                    <br/>
                    <Input
                        type="password"
                        value={newPassword}
                        placeholder="New Password"
                        onChange={(e) => {setNewPassword(e.target.value)}}
                        valid={validatePassword(newPassword)}
                        invalid={newPassword.length > 0 && !validatePassword(newPassword)}
                        style={{borderRadius:14}}    
                    />
                    <FormFeedback>
                      {validatePasswordLiteral(newPassword)}
                    </FormFeedback>
                    <br/>
                    <Input
                        type="password"
                        value={newPasswordConfirm}
                        placeholder="Confirm New Password"
                        onChange={(e) => {setNewPasswordConfirm(e.target.value)}}
                        valid={(newPasswordConfirm.length > 0 && newPasswordConfirm === newPassword)}
                        invalid={newPasswordConfirm.length > 0 && !(newPasswordConfirm === newPassword)}
                        style={{borderRadius:14}}    
                    />
                    <FormFeedback>
                      Passwords Do Not Match
                    </FormFeedback>
                    <br/>
                    <Button 
                        size="md"
                        style={{float:'left',backgroundColor:colorPalette.secondary,color:colorPalette.white,width:'40%',borderRadius:14}} 
                        onClick={async () => {
                            await handlePasswordUpdate(user,oldPassword,newPassword,newPasswordConfirm,dismissAlerts,
                                setAlertPassword,setAlertPasswordSucess,setAlertPasswordMessage);
                        }}
                        disabled={!validatePassword(newPassword) || !validatePassword(oldPassword) || !(newPasswordConfirm === newPassword)}
                    > Update My Password
                    </Button>
                </FormGroup> 
            </Form>
            </ModalBody>
        </Modal>
      <div style={{width:'65vw',display:'flex',alignItems: 'center',justifyContent:'space-evenly',padding:'1vw'}}>
        <div style={{margin:'1vw'}}>
            <FormControlLabel
                control={<Switch checked={disabled} onChange={async ()=> {await handleUpdateDisabled(user,setUser,!disabled,setDisabled);setDisabled(!disabled);}} />}
                label="Disable My Account"
            />
        </div>
        <div style={{margin:'1vw'}}>
            <ButtonMUI variant="outlined" color="secondary" onClick={()=> {setModalDelete(true);}}>
                Delete My Account
            </ButtonMUI>
        </div>
      </div>
    </div>
};

async function handlePasswordUpdate(user,oldPassword,newPassword,newPasswordConfirm,dismissAlerts,
    setAlertPassword,setAlertPasswordSucess,setAlertPasswordMessage){
    dismissAlerts();
    try { 
        if (!oldPassword || !newPassword || ! newPasswordConfirm || !(newPassword===newPasswordConfirm)){
            setAlertPassword(true);
            setAlertPasswordMessage('Missing or invalid field');
        } else {
            const body = {"newPassword":newPassword,"oldPassword":oldPassword}
            const data = await apiUpdatePassword(user._id,body);
            if (data){
                setAlertPasswordSucess(true);
            } else {
                setAlertPassword(true);
                setAlertPasswordMessage('Oops... Something went wrong. Your password did not change.');
            }
        };
    } catch (err){
        console.log(err);
        if (err.response.status === 401){
            setAlertPassword(true);
            setAlertPasswordMessage('Original password was invalid. We were unable to change your password.');
        } else{
            setAlertPassword(true);
        setAlertPasswordMessage('Oops... Something went wrong. Your password did not change.');
        }
    };
};

async function handleUpdateDisabled(user,setUser,disabled,setDisabled){
    try{
        const body = {"disabled":disabled}
        const data = await apiUpdateUser(user._id,body);
        if (data){
          const newUser = JSON.parse(getUser());
          newUser.disabled = disabled;
          login(newUser,newUser.role,newUser.isVerified,newUser.isSurveyed);
          setUser(newUser);
        } else {
          setDisabled(user.disabled);
        }
      } catch (error){
        console.log(error);
        setDisabled(user.disabled);
      };
};

async function handleDeleteAccount(user,setAlertDelete,history,dismissAlerts){
    dismissAlerts();
    try {
        const data = await apiDeleteUser(user._id);
        if (data){
            logout();
            history.push('/auth');
        } else {
            setAlertDelete(true);
        }
    } catch(err){
        console.log(err);
        setAlertDelete(true);
    };
};

export default Settings;