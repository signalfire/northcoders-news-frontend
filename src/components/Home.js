import React from 'react';
import Grid from '@material-ui/core/Grid';
 

const Home = () => {
    return (
        <div className="Home">
            <Grid container spacing={24}>
                <Grid item xs={12} sm={9}>Two Thirds</Grid>
                <Grid item xs={12} sm={3}>One Third</Grid>
            </Grid>
        </div>
    );
};

export default Home;