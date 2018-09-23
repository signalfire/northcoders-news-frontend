import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import produce from 'immer';

import { Typography, Grid, Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import * as api from '../utils/api';
import ErrorRedirect from './ErrorRedirect';

const styles = {
    bar: {
        background: "linear-gradient(to bottom, #f5f5f5, #e4e3e3)",
        paddingTop:"0.5rem",
        paddingBottom:"0.2rem",
        "@media(min-width:768px)": {
            paddingBottom:"0.5rem"
        }
    },
    list:{
        listStyleType:"none",
        margin:"0",
        padding:"0",
        paddingLeft:"10px",
        paddingTop:"8px",
        "@media(min-width:768px)": {
            paddingLeft:"27px",
        }
    },
    item:{
        marginRight:"0.5rem",
        display:"inline-block",
        fontSize:"0.9rem", 
        "@media(min-width:768px)": {
            fontSize:"1.2rem", 
            marginRight:"1rem"
        }
    },
    link:{
        color:"#000",
        textDecoration:"none"
    },
    button:{
        paddingRight:"0",
        top:"-3px",
        "@media(min-width:768px)":{
            top:"0",
            paddingRight:"27px"
        }
    }
};

class Topics extends Component {
    state = {
        topics: [],
        el: null,
        error: false
    }
    render() {
        const {classes} = this.props;
        const {el, error} = this.state;
        return (
            <div className={classes.bar}>
                <ErrorRedirect error={error}/>
                <Grid container>
                    <Grid item xs={11}>
                        <Typography component="ul" className={classes.list}>
                            <Typography component="li" className={classes.item}>Topics</Typography>
                            <Typography component="li" className={classes.item}><Link to="/" className={classes.link}>All Articles</Link></Typography>
                            {this.state.topics.map(topic => {
                                return(<Typography key={topic._id} component="li" className={classes.item}><Link to={`/articles/${topic.slug}`} className={classes.link}>{topic.title}</Link></Typography>)
                            })}
                            <Typography component="li" className={classes.item}><Link to="/leaderboard" className={classes.link}>Leaderboard</Link></Typography>
                        </Typography>                        
                    </Grid>
                    <Grid item xs={1} style={{textAlign:'right'}}>
                        <IconButton aria-owns={el ? 'sort-menu' : null} aria-haspopup="true" disabled={this.disableSort()} onClick={this.handleClick} className={classes.button}>
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
        api.getTopics()
            .then(response => {
                const {topics} = response.data;
                this.setState(
                    produce(draft => {
                        draft.topics = topics;
                    })
                );
            })
            .catch(err => {
                const {status} = err.response.data;
                this.setState(
                    produce(draft => {
                        draft.error = status;
                    })
                );
            });  
    }

    handleClick = (event) => {
        this.setState({el:event.currentTarget});
    }

    handleClose = (order) => {
        const {changeSorting} = this.props;
        this.setState({el: null});
        changeSorting(order);
    }
    disableSort = () => {
        const {location} = this.props;
        return location.pathname.startsWith('/article/');
    }
}

Topics.propTypes = {
    classes: PropTypes.object.isRequired,
    changeSorting: PropTypes.func.isRequired
}

export default withStyles(styles)(Topics);