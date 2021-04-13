import React from 'react';
import avatar from '../Student/unknown-avatar.jpg';
import { InputGroup,InputGroupAddon,InputGroupText,Input} from 'reactstrap';
 
function ContactInfoRead({user}) {
    return <div style={{width:'65vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white'}}>
      <h5 style={{marginTop:'1vw',float:'left',paddingLeft:'1vw',fontSize:'1.5vw'}}>Contact Info</h5>
      <div style={{width:'65vw',display:'flex',alignItems: 'center',justifyContent:'space-evenly',padding:'1vw'}}>
        <div style={{margin:'1vw'}}>
          <img src={avatar} style={{height: '10vw'}}/>
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