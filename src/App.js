import React, { Component, Fragment} from 'react';
import {Route} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Header from './components/Header';
import Home from './components/Home';
import Profile from './components/Profile';
import Articles from './components/Articles'
import Article from './components/Article';
import Topics from './components/Topics';

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
        <Header user={this.state.user}/>        
        <Topics/>
        <main className="app">
          <Grid container spacing={24}>
            <Grid item xs={12} sm={9}>
              <Route exact path="/" component={Home}/>
              <Route exact path="/articles" render={({match}) => <Articles match={match}/>}/>
              <Route path="/articles/:topic" render={({match}) => <Articles match={match}/>}/>
              <Route path="/article/:id" render={({match}) => <Article match={match} user={this.state.user}/>}/>
              <Route path="/profile/:username" render={({match}) => <Profile match={match}/>}/>            
            </Grid>
            <Grid item xs={12} sm={3}>One Third</Grid>
          </Grid>        
        </main>
      </Fragment>      
    );
  }
}

export default App;
