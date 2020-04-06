import React from "react"
import {connect} from "react-redux"
import Header from "./components/Header"
import Home from "./components/Home"

class App extends React.PureComponent {
  render(){
    return(
      <div>
        <Header appName={this.props.appName}/>
        <Home/>
      </div>
    )
  }
}

function mapStateToProps(state){
 return {appName:state.appName}
}

export default connect(mapStateToProps,()=>({}))(App)