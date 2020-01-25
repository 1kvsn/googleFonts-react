import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import Home from './components/Home';


class App extends Component {
  
  componentDidMount = () => {
		fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_API_KEY}`)
    .then(res => res.json())
    .then(({ items }) => {
      this.props.dispatch({ type:"ADD_FONTS",payload: items })
    }).catch(err => console.error(err))
  }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
