import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    indicator:{
        border:'solid 1px rgba(0, 0, 0, 0.23)',
        background:'#fff',
        display:'inline-flex',
        padding: '8px 16px',
        fontSize: '0.875rem',
        minHeight: '36px',
        boxSizing: 'border-box',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        borderRadius: '4px',
        position: 'relative',
        top:'2px'
    }
}

const ArticlePager = (props) => {
    const {total, current, backPage, nextPage, classes} = props
    const isDisabled = (direction) => {
        if (direction === 'back' && current === 1) return true;
        if (direction === 'next' && current === total) return true;
        return false;
    }
    if (total === 1) return null;
    return (
        <Fragment>
            <Button variant="outlined" color="primary" onClick={backPage} disabled={isDisabled('back')} style={{marginRight:"1rem"}}>Back</Button>
            <Button variant="outlined" color="primary" onClick={nextPage} disabled={isDisabled('next')} style={{marginRight:"1rem"}}>Next</Button>
            <span className={classes.indicator}>{current} of {total}</span>
        </Fragment>
    );
};

ArticlePager.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    backPage: PropTypes.func.isRequired,
    nextPage: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticlePager);