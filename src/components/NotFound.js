import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    title: {
        marginBottom:'2rem'
    }
}

const NotFound = (props) => {
    const {classes} = props;
    return (
        <Fragment>
            <Typography component="h1" variant="display1" className={classes.title}>Sorry...</Typography>
            <Typography component="p">Unable to find the content requested</Typography>
        </Fragment>
    );
};

NotFound.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(NotFound);