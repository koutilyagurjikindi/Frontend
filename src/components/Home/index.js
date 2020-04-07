import React from "react";
import MainView from "./MainView";
import Banner from "./Banner";
import agent from "../../agent";
import { connect } from "react-redux";

class Home extends React.PureComponent {
  UNSAFE_componentWillMount() {
    this.props.onLoad(agent.Articles.all(10));
  }
  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />
        <MainView />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appName: state.appName,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: (payload) => dispatch({ type: "HOME_PAGE_LOADED", payload }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
