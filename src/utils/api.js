import axios from 'axios';

const API_URL = 'https://northcoders-news-rgc.herokuapp.com/api';

export const getArticlesByTopic = (topic) => {
    return axios.get(`${API_URL}/topics/${topic}/articles`)
}
export const getTopics = () => {
    return axios.get(`${API_URL}/topics`);
}
export const getAllArticles = () => {
    return axios.get(`${API_URL}/articles`);
}
export const getArticle = (id) => {
    return axios.get(`${API_URL}/articles/${id}`);
}
export const getArticleComments = (id) => {
    return axios.get(`${API_URL}/articles/${id}/comments`);
}
export const updateArticleVote = (id, direction) => {
    return axios.patch(`${API_URL}/articles/${id}?vote=${direction}`)
}
export const updateCommentVote = (id, direction) => {
    return axios.patch(`${API_URL}/comments/${id}?vote=${direction}`)
}
export const getUser = (username) => {
    return axios.get(`${API_URL}/users/${username}`)
}
export const addArticleComment = (id, comment) => {
    return axios.post(`${API_URL}/articles/${id}/comments`, comment)
}