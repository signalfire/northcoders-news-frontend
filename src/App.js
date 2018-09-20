import React, { Component, Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';

import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Articles from './components/Articles'
import Article from './components/Article';
import Topics from './components/Topics';
import NotFound from './components/NotFound';

class App extends Component {
  state = {
    user: {
      "_id":"5b8905af0f429b2c867e97e5",
      "username":"tickle122",
      "name":"Tom Tickle",
      "avatar_url":"https://www.spiritsurfers.net/monastery/wp-content/uploads/_41500270_mrtickle.jpg",
      "__v":0
    }
  }
  render() {
    return (
      <Fragment>
        <Route render={(props) => <Header {...props} user={this.state.user} logoutUser={this.logoutUser}/>}/>   
        <Route render={(props) => <Topics user={this.state.user}/>}/>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/articles" render={({match}) => <Articles match={match} user={this.state.user}/>}/>
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
