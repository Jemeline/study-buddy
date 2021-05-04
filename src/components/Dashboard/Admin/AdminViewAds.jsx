import React, { useState, useEffect } from "react";
import { colorPalette } from "../../../utils/design";
import { Grid } from "@material-ui/core";
import ReactLoading from "react-loading";
import AdminAd from "./AdminAd";
import { getAllAds } from "../../../utils/api";

// Admin Dash - View Tutor Ads
const AdminViewAds = () => {
    const [ads, setAds] = useState(null);
    useEffect(() => {
        getAllAds()
        .then(res => setAds(res.data))
        .catch(err => console.error(err));
    }, []);

    return ads ? (
        <div>
            <h4>Tutor Ads</h4>
            <div style={{
                flexGrow: 1,
                height: "calc(100vh - 85px)",
                overflowY: "auto",
                overflowX: "hidden",
                margin: "10px",
                padding: "20px"
            }}>
                
                <Grid container direction="row" justify="flex-start" spacing={1}>
                    {ads.map(ad => (
                        <Grid key={ad._id} item xs={4} sm={4} md={4}>
                            <AdminAd ad={ad} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    ) : <ReactLoading type={"cylon"} color={colorPalette.secondary} />;
};

export default AdminViewAds;
