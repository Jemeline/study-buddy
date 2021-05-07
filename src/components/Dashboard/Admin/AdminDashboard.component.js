import React from 'react';
import { Container } from "react-bootstrap";
import AdminViewAds from "./AdminViewAds";
import AdminGetUsers from "./AdminGetUsers";
import CreateAdmin from "./CreateAdmin";
 
function AdminDashboard(props) {
    return <Container data-testid='Admin-Dashboard' style={{"marginBottom": "5vh", "marginTop": "3vh"}}>
      <CreateAdmin />
      <AdminViewAds />
      <AdminGetUsers />
    </Container>
};
 
export default AdminDashboard;