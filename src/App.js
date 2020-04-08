import React from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";

class App extends React.PureComponent {
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { appName: state.appName };
}

export default connect(mapStateToProps, () => ({}))(App);
