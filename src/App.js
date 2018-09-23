import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import produce from 'immer';

import Profile from './components/Profile';
import Articles from './components/Articles'
import Article from './components/Article';
import AppError from './components/AppError';
import Layout from './components/Layout';
import Leaderboard from './components/Leaderboard';

class App extends Component {
  state = {
    user: false,
    sorting: 'sort-by-date-desc'
  }
  render() {
    return (
      <Switch>
        <Route exact path="/" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <Articles match={props.match} history={props.history} user={this.state.user} sorting={this.state.sorting} changeLoggedInUser={this.changeLoggedInUser}/>
          </Layout>)}
        />
        <Route path="/articles/:topic" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <Articles match={props.match} history={props.history} user={this.state.user} sorting={this.state.sorting} changeLoggedInUser={this.changeLoggedInUser}/>
          </Layout>)}
        />
        <Route path="/article/:id" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <Article match={props.match} history={props.history} user={this.state.user} sorting={this.state.sorting} changeLoggedInUser={this.changeLoggedInUser}/>
          </Layout>)}
        />
        <Route path="/profile/:username" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <Profile match={props.match} history={props.history} user={this.state.user} changeLoggedInUser={this.changeLoggedInUser}/>
          </Layout>)}
        /> 
        <Route exact path="/leaderboard" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <Leaderboard match={props.match} history={props.history} user={this.state.user} sorting={this.state.sorting} changeLoggedInUser={this.changeLoggedInUser}/>
          </Layout>)}
        />        
        <Route path="/404" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <AppError title="Whoops..." message="The page you reqested can't be found...sorry about that occasionally I forget what I'm doing...."/>
          </Layout>
        )}/>              
        <Route path="/400" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <AppError title="Watch what you input...." message="An error has occurred that means the data provided was not correct. Might need to go to Specsavers"/>
          </Layout>
        )}/>              
        <Route path="/500" render={(props) => (
          <Layout {...props} {...this.state} logoutUser={this.logoutUser} changeSorting={this.changeSorting}>
            <AppError title="Woah...." message="A really bad error occurred...the developer should be shot"/>
          </Layout>
        )}/>              
      </Switch>        
    );
  }

  changeLoggedInUser = (user) => {
    this.setState(
      produce(draft => {
        draft.user = user;
      })
    );
  }
  logoutUser = () => {
    this.setState(
      produce(draft => {
        draft.user = false;
      })
    );
  }
  changeSorting = (sorting) => {
    if (typeof(sorting) === 'string'){
      this.setState(
        produce(draft => {
          draft.sorting = sorting;
        })
      );
    }
  }
}

export default App;
