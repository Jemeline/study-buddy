import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import { getUser } from '../../utils/common';
import Settings from "./Student/Settings.component";

const AdminSettings = () => {
    const [user, setUser] = useState(JSON.parse(getUser()));
    return <Container style={{marginTop: "5vh"}}><Settings user={user} setUser={setUser} hidden={false} /></Container>
};

export default AdminSettings;