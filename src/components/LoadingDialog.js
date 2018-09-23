import React from 'react';
import PropTypes from 'prop-types';

import {Dialog, CircularProgress} from '@material-ui/core';

const LoadingDialog = (props) => {
    const {isLoading} = props;
    return (
        <Dialog style={{backgroundColor: 'transparent'}} open={isLoading}>
            <CircularProgress style={{padding:'2rem'}} />
        </Dialog>  
    );
};

LoadingDialog.propTypes = {
    isLoading: PropTypes.bool.isRequired
}

export default LoadingDialog;