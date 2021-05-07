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
        <div data-testid='AdminViewAds'>
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
                        <Grid key={ad._id} item xs={12} sm={6} md={3}>
                            <AdminAd data-testid='AdminAd' ad={ad} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    ) : <ReactLoading data-testid='AdminViewAds' type={"cylon"} color={colorPalette.secondary} />;
};

export default AdminViewAds;
