import React from "react"
import MainView from "./MainView"
import Banner from "./Banner"
import {connect} from "react-redux"

class Home extends React.PureComponent{
  render(){
    return(
      <div className="home-page">
        <Banner appName={this.props.appName}/>
        <MainView/>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    appName: state.appName
  }
}

export default connect(mapStateToProps,()=>({}))(Home)