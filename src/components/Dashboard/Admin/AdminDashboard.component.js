import React from 'react';
import { Container } from "react-bootstrap";
import AdminViewAds from "./AdminViewAds";
import AdminGetUsers from "./AdminGetUsers";
import CreateAdmin from "./CreateAdmin";
 
function AdminDashboard(props) {
    return <Container style={{"marginBottom": "5vh", "marginTop": "3vh"}}>
      <h4>Admin Dashboard</h4>
      <CreateAdmin />
      <AdminViewAds />
      <AdminGetUsers />
    </Container>
};
 
export default AdminDashboard;