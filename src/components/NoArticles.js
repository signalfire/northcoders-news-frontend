import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { Typography } from '@material-ui/core';

const NoArticles = (props) => {
    const {topic, isLoading, articles} = props;
    if (!isLoading && articles.length === 0){
        return (
            <Fragment>
                <Typography component="p">Sorry, no articles found {topic ? `for ${topic}` : ''}</Typography>
            </Fragment>
        );
    } else {
        return null;
    }
};

NoArticles.propTypes = {
    topic: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    articles: PropTypes.array.isRequired
}

export default NoArticles;