// Written by Sai Gongidi
// Admin Dashboard- Render User Component

import React, { useState } from "react";
import { apiDeleteUser, apiUpdateUser } from "../../../utils/api";
import { colorPalette } from "../../../utils/design";
import { Row, Col, Image, Button, ButtonGroup } from "react-bootstrap";

const UserItem = ({ user }) => {
    const [edit, setEdit] = useState(false);
    const handleUser = () => {
        apiDeleteUser(user._id).then(() => {
            alert("User deleted.");
            window.location.reload();
        }).catch(err => console.error(err));
    };
    const handlePic = () => {
        apiUpdateUser(user._id, {"avatar": ""}).then(res => {
            console.log(res);
            alert("Picture deleted.");
            setEdit(false);
            window.location.reload();
        }).catch(err => console.error(err));
    };

    return edit ? (
        <Row>
            <Col><Image src={user.avatar} fluid rounded /></Col>
            <Col>{user.first} {user.last}</Col>
            <Col>{user.email}</Col>
            <Col>{user.phoneNumber}</Col>
            <Col>{user.role}</Col>
            <Col>
                <ButtonGroup>
                    {user.avatar ? <Button data-testid='delete-user-picture' style={{backgroundColor: colorPalette.secondary}} onClick={handlePic}>Delete Picture</Button> : null}
                    <Button data-testid='delete-user' style={{backgroundColor: colorPalette.secondary}} onClick={handleUser}>Delete User</Button>
                    <Button data-testid='cancel-delete-user' variant="danger" onClick={() => setEdit(false)}>Cancel</Button>
                </ButtonGroup>
            </Col>
        </Row>
    ) : (
        <Row>
            <Col><Image src={user.avatar} fluid rounded /></Col>
            <Col>{user.first} {user.last}</Col>
            <Col>{user.email}</Col>
            <Col>{user.phoneNumber}</Col>
            <Col>{user.role}</Col>
            <Col><Button data-testid='edit-user' style={{backgroundColor:colorPalette.secondary}} onClick={() => setEdit(true)}>Edit</Button></Col>
        </Row>
    );
};

export default UserItem;