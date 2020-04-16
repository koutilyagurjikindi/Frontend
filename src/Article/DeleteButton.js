import React from "react"
import {connect} from "react-redux"
import Axios from "axios"
import { bindActionCreators } from "redux"
import { getArticle } from "../Action"

class DeleteButton extends React.PureComponent{
  del(){
    Axios({
      method:"delete",
      url:`https://conduit.productionready.io/api/articles/${this.props.slug}/comments/${this.props.commentId}`,
      headers:{
        authorization: `Token ${this.props.OnArticleCommon.token}`
      }
    })
    .then(response=>{
      Axios({
        method:"get",
        url: `https://conduit.productionready.io/api/articles/${this.props.slug}/comments`
      })
      .then(response=>{
        console.log(response)
        this.props.OnArticle({comments:response.data.comments})
      })
    })
    .catch(({response})=>{
      console.log(response)
    })
  }
  render(){
    if (this.props.show) {
      return(
        <span className="mod-options">
          <i className="ion-trash-a" onClick={()=>this.del()}></i>
        </span>
      );
    }else{
    return null;
    }
  }
}

function mapStateToProps(state){
  return {
    OnArticleCommon: state.common
  }
}

function mapDispatchToProps(dispatch){
  return {
    OnArticle:bindActionCreators(getArticle,dispatch)
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(DeleteButton)