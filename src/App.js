import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Profile from './components/Profile';
import Articles from './components/Articles'
import Article from './components/Article';
import NotFound from './components/NotFound';
import Layout from './components/Layout'

class App extends Component {
  state = {
    user: false,
    sorting: 'sort-by-date-desc'
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Layout {...props} user={this.state.user} logoutUser={this.logoutUser} sorting={this.state.sorting} changeSorting={this.changeSorting}>
            <Articles match={props.match} user={this.state.user} sorting={this.state.sorting}/>
          </Layout>)}
        />
        <Route path="/articles/:topic" render={(props) => (
          <Layout {...props} user={this.state.user} logoutUser={this.logoutUser} sorting={this.state.sorting} changeSorting={this.changeSorting}>
            <Articles match={props.match} user={this.state.user} sorting={this.state.sorting}/>
          </Layout>)}
        />
        <Route path="/article/:id" render={(props) => (
          <Layout {...props} user={this.state.user} logoutUser={this.logoutUser} sorting={this.state.sorting} changeSorting={this.changeSorting}>
            <Article match={props.match} user={this.state.user} sorting={this.state.sorting}/>
          </Layout>)}
        />
        <Route path="/profile/:username" render={(props) => (
          <Layout {...props} user={this.state.user} logoutUser={this.logoutUser} sorting={this.state.sorting} changeSorting={this.changeSorting}>
            <Profile match={props.match} user={this.state.user} changeLoggedInUser={this.changeLoggedInUser}/>
          </Layout>)}
        /> 
        <Route render={(props) => (
          <Layout {...props} user={this.state.user} logoutUser={this.logoutUser} sorting={this.state.sorting} changeSorting={this.changeSorting}>
            <NotFound/>
          </Layout>
        )}/>      
      </Switch>        
    );
  }

  changeLoggedInUser = (user) => {
    this.setState({user});
  }
  logoutUser = () => {
    this.setState({user:false});
  }
  changeSorting = (sorting) => {
    if (typeof(sorting) === 'string'){
      this.setState({sorting});
    }
  }
}

export default App;
