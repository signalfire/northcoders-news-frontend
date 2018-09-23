import axios from 'axios';

const API_URL = 'https://northcoders-news-rgc.herokuapp.com/api';

export const getArticlesByTopic = (topic, currentPage, pageSize, sorting) => {
    return axios.get(`${API_URL}/topics/${topic}/articles?page=${currentPage}&pageSize=${pageSize}&sort=${sorting.sort}&direction=${sorting.direction}`)
}
export const getTopics = () => {
    return axios.get(`${API_URL}/topics`);
}
export const getAllArticles = (currentPage, pageSize, sorting) => {
    return axios.get(`${API_URL}/articles?page=${currentPage}&pageSize=${pageSize}&sort=${sorting.sort}&direction=${sorting.direction}`);
}
export const getUserArticles = (username) => {
    return axios.get(`${API_URL}/users/${username}/articles`);
}
export const getArticle = (id) => {
    return axios.get(`${API_URL}/articles/${id}`);
}
export const getArticleComments = (id) => {
    return axios.get(`${API_URL}/articles/${id}/comments`);
}
export const updateArticleVote = (id, direction) => {
    return axios.patch(`${API_URL}/articles/${id}?vote=${direction}`);
}
export const updateCommentVote = (id, direction) => {
    return axios.patch(`${API_URL}/comments/${id}?vote=${direction}`);
}
export const getUser = (username) => {
    return axios.get(`${API_URL}/users/${username}`);
}
export const addArticleComment = (id, comment) => {
    return axios.post(`${API_URL}/articles/${id}/comments`, comment);
}
export const deleteArticleComment = (id) => {
    return axios.delete(`${API_URL}/comments/${id}`);
}
export const addArticle = (topic, article) => {
    return axios.post(`${API_URL}/topics/${topic}/articles`, article);
}
export const getStats = () => {
    return axios.get(`${API_URL}/stats`);
}