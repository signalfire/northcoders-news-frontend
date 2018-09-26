import React, { Component } from 'react';
import PropTypes from 'prop-types';

import produce from 'immer';

import { Grid, Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import { withStyles } from '@material-ui/core/styles';

import * as api from '../utils/api';
import ErrorRedirect from './ErrorRedirect';

const styles = {
    bar: {
        background: 'linear-gradient(to bottom, #f5f5f5, #e4e3e3)',
        paddingTop:'0.5rem',
        paddingBottom:'0.2rem',
        '@media(min-width:768px)': {
            paddingBottom:'0.5rem'
        }
    },
    list:{
        listStyleType:'none',
        margin:'0',
        padding:'0',
        paddingLeft:'10px',
        paddingTop:'8px',
        '@media(min-width:768px)': {
            marginLeft:'27px',
        }
    },
    item:{
        marginRight:'0.5rem',
        display:'inline-block',
        fontSize:'0.9rem', 
        '&>i':{
            marginRight:'0.5rem'
        },
        '@media(min-width:768px)': {
            fontSize:'1.2rem', 
            marginRight:'1rem'
        }
    },
    link:{
        color:'#000',
        textDecoration:'none',
        '&:hover': {
            color:'#BA1F31'
        }
    },
    sortButton:{
        top:'-3px',
        '@media(min-width:768px)':{
            top:'0',
        }
    },
    menuButton:{
        marginLeft:'0',
        '@media(min-width:768px)':{
            marginLeft:'12px'
        }
    },
    showOnMobile:{
        '@media(min-width:768px)': {
            display:'none !important'
        }
    },
};

class Topics extends Component {
    state = {
        topics: [],
        sortMenuEl: null,
        mobileMenuEl: null,
        error: false,
        open: false
    }
    render() {
        const {classes} = this.props;
        const {sortMenuEl, mobileMenuEl, error} = this.state;
        return (
            <div className={classes.bar}>
                <ErrorRedirect error={error}/>
                <Grid container spacing={0}>
                    <Grid item xs={6}>
                        <IconButton aria-owns={mobileMenuEl ? 'mobile-menu' : null} aria-haspopup="true" onClick={this.handleMobileMenuClick} className={classes.menuButton}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu id="mobile-menu" anchorEl={mobileMenuEl} open={Boolean(mobileMenuEl)} onClose={this.handleMobileMenuClose}>
                            <MenuItem key="all" onClick={() => this.handleMobileMenuClose('all')}>All Articles</MenuItem>
                            {this.state.topics.map(topic => {
                                return (<MenuItem key={topic.slug} onClick={() => this.handleMobileMenuClose(topic.slug)}>{topic.title}</MenuItem>)
                            })}
                            <MenuItem key="leaderboard" onClick={() => this.handleMobileMenuClose('leaderboard')}>Leaderboard</MenuItem>
                        </Menu>    
                    </Grid>
                    <Grid item xs={6} style={{textAlign:'right'}}>
                        <IconButton aria-owns={sortMenuEl ? 'sort-menu' : null} aria-haspopup="true" disabled={this.disableSort()} onClick={this.handleSortClick} className={classes.sortButton}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Menu id="sort-menu" anchorEl={sortMenuEl} open={Boolean(sortMenuEl)} onClose={this.handleSortClose}>
                            <MenuItem onClick={() => this.handleSortClose('sort-by-date-desc')}>Sort By Date (Newest First)</MenuItem>
                            <MenuItem onClick={() => this.handleSortClose('sort-by-date-asc')}>Sort By Date (Oldest First)</MenuItem>
                            <MenuItem onClick={() => this.handleSortClose('sort-by-title-asc')}>Sort By Title (A-Z)</MenuItem>
                            <MenuItem onClick={() => this.handleSortClose('sort-by-title-desc')}>Sort By Title (Z-A)</MenuItem>
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

    handleSortClick = (event) => {
        this.setState({sortMenuEl: event.currentTarget});
    }
    handleMobileMenuClick = (event) => {
        this.setState({mobileMenuEl: event.currentTarget});
    }
    handleSortClose = (order) => {
        const {changeSorting} = this.props;
        this.setState({sortMenuEl: null});
        changeSorting(order);
    }
    handleMobileMenuClose = (target) => {
        const {history} = this.props;
        const destinations = {
            all: '/',
            coding: '/articles/coding',
            cooking: '/articles/cooking',
            football: '/articles/football',
            leaderboard: '/leaderboard'
        }
        this.setState({mobileMenuEl: null});
        history.push(destinations[target]);
    }
    getTopicIconClass = (topic) => {
        const topics = {
            all: 'fas fa-globe',
            leaderboard: 'fas fa-trophy',
            coding: 'fas fa-laptop-code',      
            football: 'far fa-futbol',
            cooking: 'fas fa-utensils' 
        }
        return topics[topic];
    }    
    disableSort = () => {
        const {location} = this.props;
        return location.pathname.startsWith('/article/') || location.pathname.startsWith('/leaderboard');
    }
    isOnMobile = () => {
        return window.innerWidth < 768;
    }
}

Topics.propTypes = {
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    changeSorting: PropTypes.func.isRequired
}

export default withStyles(styles)(Topics);