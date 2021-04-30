import React, { useState, useEffect } from "react";
import { Container, ListGroup, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
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
        <Container style={{marginTop: "3vh"}}>
            <h4>Users</h4>
            <ListGroup className="shadow">
                <ListGroup.Item style={style}>
                    <Row>
                        <Col><strong>Profile Picture</strong></Col>
                        <Col><strong>Name</strong></Col>
                        <Col><strong>Email   </strong></Col>
                        <Col><strong>Phone Number</strong></Col>
                        <Col><strong>Role</strong></Col>
                        <Col>      </Col>
                    </Row>
                </ListGroup.Item>
                {users ? 
                    users.length !== 0 ? 
                        users.map(user => 
                            <ListGroup.Item key={user._id} variant={user.role==="admin" ? "danger" : null}>
                                <UserItem user={user} />
                            </ListGroup.Item>
                        )
                    : "No users found" 
                : <ReactLoading type={"cylon"} color={colorPalette.secondary} />}
            </ListGroup>
        </Container>
    );
};

export default AdminGetUsers;