import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

import {Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {}

const NotFound = (props) => {
    const {classes} = props;
    return (
        <Fragment>
            <Typography component="h1" variant="display1">Sorry...</Typography>
            <Typography component="p">Unable to find the content requested</Typography>
        </Fragment>
    );
};

NotFound.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFound);