import React from "react";
import MainView from "./MainView";
import Banner from "./Banner";
import { connect } from "react-redux";
import Axios from "axios";

class Home extends React.PureComponent {
  UNSAFE_componentWillMount() {
    Axios({
      method:"GET",
      url:"https://conduit.productionready.io/api/articles"
    })
    .then(response=>{
      this.props.onLoad(response.data)
    })
    .catch(error=>{
      console.log(error);
    })
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
