import React from "react";
import MainView from "./MainView";
import Banner from "./Banner";
import { connect, } from "react-redux";
import { bindActionCreators } from "redux"
import Axios from "axios";
import {gethomepage} from "../../Action"
import Tags from "./Tags"

class Home extends React.PureComponent {
  UNSAFE_componentWillMount() {
    if(this.props.OnHomecommon.token){
      this.props.onLoad({tabs:"feed"})
      Axios({
        method:"GET",
        url:"https://conduit.productionready.io/api/articles/feed",
        headers:{
          authorization: `Token ${this.props.OnHomecommon.token}`
        }
      })
      .then(response=>{
        this.props.onLoad({articles:response.data.articles})
      })
      .catch(error=>{
        console.log(error);
      })
    }else{
      this.props.onLoad({tabs:"all"})
      Axios({
        method:"GET",
        url:"https://conduit.productionready.io/api/articles"
      })
      .then(response=>{
        this.props.onLoad({articles:response.data.articles})
      })
      .catch(error=>{
        console.log(error);
      })
    }
    Axios({
      method:"GET",
      url:"https://conduit.productionready.io/api/tags",
    })
    .then(response=>{
      this.props.onLoad({tags:response.data.tags})
    })
    .catch(error=>{
      console.log(error)
    })
  }
  render() {
    return (
      <div className="home-page">
        <Banner appName={this.props.appName} />
        <div className="container page">
          <div className="row">
            <MainView />

            <div className="col-md-3">
              <div className="sidebar">

                <p>Popular Tags</p>

                <Tags
                  tags={this.props.OnHomehome.tags}
                  onClickTag={this.props.onClickTag} />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appName: state.common.appName,
    OnHomecommon: state.common,
    OnHomehome: state.home
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLoad: bindActionCreators(gethomepage,dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
