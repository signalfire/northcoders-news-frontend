import React, {Fragment} from 'react';
import Typography from '@material-ui/core/Typography';

const NotFound = () => {
    return (
        <Fragment>
            <Typography component="h1" variant="display1">Sorry...</Typography>
            <Typography component="p">Unable to find the content requested</Typography>
        </Fragment>
    );
};

export default NotFound;