import React, { Component } from 'react';
import './App.scss';
import Home from './components/Home';
import {connect} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Page2 from './components/Page2';
var api = require('./api');



class App extends Component {
  constructor() {
    super();

    this.state = {
      modArr: "",
    }
  }
  componentDidMount = () => {
		fetch(api.key)
      .then(res => res.json())
      .then(({items}) => {
        const data = items.map((item) =>
           ({ family: item.family,
            fontFamily:`https://fonts.googleapis.com/css?family=${item.family}`,
            isClicked: false,  })
        )
        // this.setState({modArr:data})
        this.props.dispatch({type: "ADD_FONTS", payload: data})
      })
      }
  
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/2' component={Page2} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect()(App);
