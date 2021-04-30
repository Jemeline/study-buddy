import React, { useState, useEffect } from "react";
import { colorPalette } from "../../../utils/design";
import { Container, Row, Col } from "react-bootstrap";
import ReactLoading from "react-loading";
import AdminAd from "./AdminAd";
import { getAllAds } from "../../../utils/api";

// Admin Dash - View Tutor Ads
const AdminViewAds = () => {
    const [ads, setAds] = useState(null);
    useEffect(() => {
        getAllAds().then(res => {
            setAds(res.data);
        }).catch(err => console.error(err));
    }, []);

    return (
        <Container>
            <h4>Tutor Ads</h4>
            {ads ? 
                ads.length !== 0 ? 
                    ads.map(ad => 
                        <Row key={ad._id}><Col>
                            <AdminAd ad={ad} />
                        </Col></Row>)
                : "No Ads found" 
            : <ReactLoading type={"cylon"} color={colorPalette.secondary} />}
        </Container>
    );
};

export default AdminViewAds;