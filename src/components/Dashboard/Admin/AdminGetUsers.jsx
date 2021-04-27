import React, { useState, useEffect } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import { getUsers } from "../../../utils/api";
import { colorPalette } from "../../../utils/design";
import UserItem from "./UserItem";

// Admin Dash - Get Users
const AdminGetUsers = () => {
    const [users, setUsers] = useState(null);
    useEffect(() => {
        getUsers().then(res => {
            // console.log(res.data);
            setUsers(res.data);
        }).catch(err => console.error(err));
    }, []);
    const style = {
        "backgroundColor": colorPalette.secondaryA,
        "color": colorPalette.white,
    };

    return (
        <Container >
            <h4>Users</h4>
            <ListGroup className="shadow">
                <ListGroup.Item style={style}>
                    <Row>
                        <Col>Profile Picture</Col>
                        <Col>Name</Col>
                        <Col>Email</Col>
                        <Col>Phone Number</Col>
                        <Col>Role</Col>
                        <Col>       </Col>
                    </Row>
                </ListGroup.Item>
                {users ? 
                    users.length !== 0 ? 
                        users.map(user => 
                            <ListGroup.Item key={user._id} variant={user.role==="admin" ? "danger" : "info"}>
                                <UserItem user={user} />
                            </ListGroup.Item>
                        )
                    : "No users found" 
                : "Loading..."}
            </ListGroup>
        </Container>
    );
};

export default AdminGetUsers;