import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

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
        const {togglePanel, classes} = this.props;
        return (
            <Fragment>
                <Card>
                    <CardContent>            
                        <form onSubmit={this.handleSubmit}>
                            {this.state.error.length > 0 && <Typography component="p" className={classes.error}>{this.state.error}</Typography>}
                            <Input name="title" placeholder="Enter title for article..." value={this.state.title} onChange={this.handleChange} fullWidth disableUnderline/> 
                            <Input name="body" placeholder="Enter body text for article..." value={this.state.body} onChange={this.handleChange} fullWidth disableUnderline multiline rows={5}/> 
                            <Button variant="outlined" color="primary" style={{marginRight:'1rem'}} onClick={this.addArticle}>Add Article</Button> 
                            <Button variant="outlined" color="primary" onClick={togglePanel}>Cancel</Button> 
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
        this.setState({
            [name]: value
        });
    }    
    addArticle = () => {
        if (this.state.title.length === 0 || this.state.body.length === 0){
            this.setState({error: 'Title and/or body fields were missing'});
        }else{
            this.props.addArticle(this.state.title, this.state.body);
            this.setState({
                title: '',
                body: ''
             })    
        }
    }
}

ArticleForm.propTypes = {
    user: PropTypes.object,
    addArticle: PropTypes.func.isRequired,
    togglePanel: PropTypes.func.isRequired
}

export default withStyles(styles)(ArticleForm);