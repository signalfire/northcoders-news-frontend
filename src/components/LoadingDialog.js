import React from 'react';

import {Dialog, CircularProgress} from '@material-ui/core';

const LoadingDialog = (props) => {
    const {isLoading} = props;
    return (
        <Dialog style={{backgroundColor: 'transparent'}} open={isLoading}>
            <CircularProgress style={{padding:'2rem'}} />
        </Dialog>  
    );
};

export default LoadingDialog;