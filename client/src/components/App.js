import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
// pull out action creators to wire to app component
import * as actions from '../actions';

// set-up of routes
import Header from './Header';
import Landing from './Landing';
const Dashboard = () => <h2>Dashboard</h2>;
const SurveyNew = () => <h2>SurveyNew</h2>;

// react-router routes
class App extends Component {
  // lifecycle hook
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/surveys" component={Dashboard} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
