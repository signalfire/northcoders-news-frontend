import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';

const Pager = (props) => {
    const {total, current, backPage, nextPage} = props
    const isDisabled = (direction) => {
        if (direction === 'back' && current === 1) return true;
        if (direction === 'next' && current === total) return true;
        return false;
    }
    if (total === 1) return null;
    return (
        <Fragment>
            <Button variant="outlined" color="primary" onClick={backPage} disabled={isDisabled('back')} style={{marginRight:"1rem"}}>Back</Button>
            <Button variant="outlined" color="primary" onClick={nextPage} disabled={isDisabled('next')}>Next</Button>
        </Fragment>
    );
};

Pager.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    backPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired
}

export default Pager;