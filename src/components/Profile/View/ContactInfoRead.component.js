/* Author: Jada Pfeiffer
Purpose: Read-only student profile component for contact info tab
*/
import React,{useState,useEffect} from 'react';
import avatarUnknown from '../Student/unknown-avatar.jpg';
import { InputGroup,InputGroupAddon,InputGroupText,Input} from 'reactstrap';
import ReactLoading from 'react-loading';
import {apiUpdateUser} from '../../../utils/api';
import {colorPalette} from '../../../utils/design';

function ContactInfoRead({user}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [avatar, setAvatar] = useState('');

    useEffect(async () => {
      try{
          setLoading(true);
          setError(false);
          const data = await apiUpdateUser(user._id,{});
          setAvatar(data.data.avatar);
          setLoading(false);
      } catch (err){
        setError(true);
        setLoading(false);
      }  
    }, [user]);

    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>Contact Info</h5>
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
              <InputGroupText style={{fontSize:'1.2vw'}}>Email</InputGroupText>
            </InputGroupAddon>
            <Input disabled style={{backgroundColor:'white',fontSize:'1.2vw'}} value={user.email}/>
          </InputGroup>
        </div>
        <div style={{margin:'1vw'}}>
          <InputGroup style={{paddingBottom:'1vw',margin:'auto'}}>
            <InputGroupAddon addonType="prepend">
              <InputGroupText style={{fontSize:'1.2vw'}}>Phone</InputGroupText>
            </InputGroupAddon>
            <Input disabled style={{backgroundColor:'white',fontSize:'1.2vw'}} value={user.phoneNumber}/>
          </InputGroup>
        </div>
      </div>
    </div>
};
 
export default ContactInfoRead;