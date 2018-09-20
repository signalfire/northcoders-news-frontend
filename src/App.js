import React, { Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Profile from './components/Profile';
import Articles from './components/Articles'
import Article from './components/Article';
import Topics from './components/Topics';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    user: false
  }
  render() {
    return (
      <Fragment>
        <Route render={(props) => <Header {...props} user={this.state.user} logoutUser={this.logoutUser}/>}/>   
        <Route render={(props) => <Topics user={this.state.user}/>}/>
        <div className="app">
          <Switch>
            <Route exact path="/" render={({match}) => <Articles match={match} user={this.state.user}/>}/>
            <Route path="/articles/:topic" render={({match}) => <Articles match={match} user={this.state.user}/>}/>
            <Route path="/article/:id" render={({match}) => <Article match={match} user={this.state.user}/>}/>
            <Route path="/profile/:username" render={({match}) => <Profile match={match} user={this.state.user} changeLoggedInUser={this.changeLoggedInUser}/>}/> 
            <Route component={NotFound}/>      
          </Switch>        
        </div>
      </Fragment>
    );
  }

  changeLoggedInUser = (user) => {
    this.setState({user})
  }
  logoutUser = () => {
    this.setState({user:false})
  }
}

export default App;
