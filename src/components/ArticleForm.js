import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import produce from 'immer';

import { Input, Button, Card, CardContent, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    error: {
        marginBottom:'1rem',
        color:'#721c24',
        backgroundColor:'#f8d7da',
        borderColor:'#f5c6cb',
        padding: '0.5rem',
        border: '1px solid transparent',
        borderRadius:'.25rem'        
    }
}

class ArticleForm extends Component {
    state = {
        title: '',
        body: '',
        error: ''
    }
    render() {
        const {classes, panelOpen} = this.props;
        if (!panelOpen) return null;
        return (
            <Fragment>
                <Card>
                    <CardContent>            
                        <form onSubmit={this.handleSubmit}>
                            {this.state.error.length > 0 && <Typography component="p" className={classes.error}>{this.state.error}</Typography>}
                            <Input name="title" placeholder="Enter title for article..." value={this.state.title} onChange={this.handleChange} fullWidth disableUnderline/> 
                            <Input name="body" placeholder="Enter body text for article..." value={this.state.body} onChange={this.handleChange} fullWidth disableUnderline multiline rows={5}/> 
                            <Button variant="outlined" color="primary" style={{marginRight:'1rem'}} onClick={this.addArticle}>Add Article</Button> 
                            <Button variant="outlined" color="primary" onClick={this.togglePanel}>Cancel</Button> 
                        </form>
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
    handleSubmit = (event) => {
        event.preventDefault();
    }
 
    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState(
            produce(draft => {
                draft[name] = value;
            })
        );
    }    
    togglePanel = () => {
        this.setState(
            produce(draft => {
                draft.title = '';
                draft.body = '';
                draft.error = '';
            })
        );
        this.props.togglePanel();
    }
    addArticle = () => {
        if (this.state.title.length === 0 || this.state.body.length === 0){
            this.setState(
                produce(draft => {
                    draft.error = 'Title and/or body fields were missing';
                })
            );
        }else{
            this.props.addArticle(this.state.title, this.state.body);
            this.setState(
                produce(draft => {
                    draft.title = '';
                    draft.body = '';
                })
            )    
        }
    }
}

ArticleForm.propTypes = {
    togglePanel: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    panelOpen: PropTypes.bool.isRequired,
    addArticle: PropTypes.func.isRequired,
}

export default withStyles(styles)(ArticleForm);