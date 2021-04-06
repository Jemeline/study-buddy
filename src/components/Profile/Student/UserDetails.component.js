import React from 'react';
import {getUser,capitalizeFirst} from '../../../utils/common';
import {Button} from 'reactstrap';
import {colorPalette} from '../../../utils/design';
import { useHistory } from "react-router-dom";
 
function UserDetails() {
    const user = JSON.parse(getUser());
    const history = useHistory();

    return <div style={{width:'60vw',boxShadow:'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',backgroundColor:'white',display:'flex',alignItems: 'center',justifyContent:'center',padding:'1vw'}}>
      <div>
        
      </div>
    </div>
};
 
export default UserDetails;