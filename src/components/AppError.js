import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {}

const AppError = (props) => {
    const {title, message} = props;
    return (
        <Fragment>
            <Typography component="h1" variant="display1">{title}</Typography>
            <Typography component="p">{message}</Typography>
        </Fragment>
    );
};

AppError.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
}

export default withStyles(styles)(AppError);