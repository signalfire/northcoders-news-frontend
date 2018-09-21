import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Typography, Grid, Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import * as api from '../utils/api';

const styles = {
    root: {
        background: "linear-gradient(to bottom, #f5f5f5, #e4e3e3)",
        paddingTop:"0.5rem",
        paddingBottom:"0.5rem",
    },
    list:{
        listStyleType:"none",
        margin:"0",
        padding:"0",
        paddingLeft:"27px",
        paddingTop:"8px"
    },
    item:{
        marginRight:"1rem",
        display:"inline-block",
        fontSize:"1.2rem", 
    },
    link:{
        color:"#000",
        textDecoration:"none"
    },
    football:{}
};

class Topics extends Component {
    state = {
        topics: [],
        el: null
    }
    render() {
        const {classes} = this.props;
        const {el} = this.state;
        return (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12} sm={11}>
                        <Typography component="ul" className={classes.list}>
                            <Typography component="li" className={classes.item}>Topics</Typography>
                            <Typography component="li" className={classes.item}><Link to="/" className={classes.link}>All Articles</Link></Typography>
                            {this.state.topics.map(topic => {
                                return(<Typography key={topic._id} component="li" className={classes.item}><Link to={`/articles/${topic.slug}`} className={classes.link}>{topic.title}</Link></Typography>)
                            })}
                        </Typography>                        
                    </Grid>
                    <Grid item xs={12} sm={1} style={{textAlign:'right',paddingRight:'27px'}}>
                        <IconButton aria-owns={el ? 'sort-menu' : null} aria-haspopup="true" onClick={this.handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu id="sort-menu" anchorEl={el} open={Boolean(el)} onClose={this.handleClose}>
                            <MenuItem onClick={() => this.handleClose('sort-by-date-desc')}>Sort By Date (Newest First)</MenuItem>
                            <MenuItem onClick={() => this.handleClose('sort-by-date-asc')}>Sort By Date (Oldest First)</MenuItem>
                            <MenuItem onClick={() => this.handleClose('sort-by-title-asc')}>Sort By Title (A-Z)</MenuItem>
                            <MenuItem onClick={() => this.handleClose('sort-by-title-desc')}>Sort By Title (Z-A)</MenuItem>
                        </Menu>                        
                    </Grid>
                </Grid>
            </div>
        );
    }
    componentDidMount() {
        api.getTopics().then(response => {
            const {topics} = response.data;
            this.setState({topics});
        });
    }

    handleClick = (event) => {
        this.setState({el: event.currentTarget});
    }

    handleClose = (order) => {
        const {changeSorting} = this.props;
        this.setState({ el: null });
        changeSorting(order);
    }
}

Topics.propTypes = {
    classes: PropTypes.object.isRequired,
    changeSorting: PropTypes.func.isRequired
}

export default withStyles(styles)(Topics);