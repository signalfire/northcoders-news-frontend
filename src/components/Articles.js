import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as api from '../utils/api';

class Articles extends Component {
    state = {
        articles: []
    }
    render() {
        return (
            <ul>
                {this.state.articles.map(article => {
                    return (<li key={article._id}><Link to={`/article/${article._id}`}>{article.title}</Link></li>)
                })}
            </ul>
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

export default Articles;