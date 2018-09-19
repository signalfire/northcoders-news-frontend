import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import moment from 'moment';

import * as api from '../utils/api';

const styles = {
    title: {
        textTransform:'capitalize',
        marginBottom:'2rem'
    },
    card:{
        marginBottom:'2rem'
    },
    cardTitle:{
        textTransform:'capitalize'
    }
}

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        const {topic} = this.props.match.params;
        const {classes} = this.props;
        return (
            <Fragment>
                <Typography variant="display1" component="h1" className={classes.title}>
                    {topic ? topic : 'Latest'} Articles
                </Typography>
                {this.state.articles.map(article => {
                    return (
                        <Card key={article._id} className={classes.card}>
                            <CardContent>   
                                <Typography component="h2" className={classes.cardTitle}>
                                    <Link to={`/article/${article._id}`}>{article.title.toLowerCase()}</Link>
                                </Typography>  
                                <Typography component="p">{article.body}</Typography>     
                                <Link to={`/profile/${article.created_by.username}`}>
                                    <Avatar alt={article.created_by.name} src={`http://i.pravatar.cc/100?q=${article.created_by.username}`} className={classes.bigAvatar} />                        
                                </Link>                                                   
                                <Typography component="p">{moment(article.created_at).format('DD/MM/YY HH:mm')}</Typography>
                            </CardContent>
                        </Card>
                    )   
                })}
            </Fragment>
        );
    }

    componentDidMount(){
        this.getArticles();
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps !== this.props){
            this.getArticles();
        }
    }

    getArticles = () => {
        const {topic} = this.props.match.params;
        if (topic){
            api.getArticlesByTopic(topic).then(({data:{articles}}) => {
                this.setState({articles})
            });    
        }else{
            api.getAllArticles().then(({data:{articles}}) => {
                this.setState({articles})
            });        
        }
    }
    
}

export default withStyles(styles)(Articles);