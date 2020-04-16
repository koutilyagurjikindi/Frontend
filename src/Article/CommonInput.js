import React from "react"
import { connect } from "react-redux"
import Axios from "axios"
import { bindActionCreators } from "redux"
import { getArticle } from "../Action"

class CommonInput extends React.PureComponent{
  constructor(){
    super()
    this.state={
      body:''
    }
    this.setBody = ev => {
      this.setState({body:ev.target.value})
    }
    this.createComment = ev => {
      ev.preventDefault();
      let payload = ""
      Axios({
        method:"post",
        url:`https://conduit.productionready.io/api/articles/${this.props.slug}/comments`,
        headers:{
          authorization: `Token ${this.props.OnCommonInputCommon.token}`
        },
        data:{
          comment: {
            body: this.state.body
          }
        }
      })
      .then(response=>{
       payload=response.data.comment
       Axios({
        method:"get",
        url: `https://conduit.productionready.io/api/articles/${this.props.slug}/comments`
      })
      .then(response=>{
        this.props.OnArticle({comments:response.data.comments})
      })
      })
      .catch(error=>{
        console.log(error)
      })
      this.setState({ body: '' });
    }
  }
  render(){
    return(
      <form className="card comment-form" onSubmit={this.createComment}>
        <div className="card-block">
          <textarea
            className="form-control"
            placeholder="Write a comment..."
            value={this.state.body}
            onChange={this.setBody}
            rows="3"
          />
        </div>
        <div className="card-footer">
          <img
            src={this.props.currentUser.image}
            className="comment-author-img" />
          <button
            className="btn btn-sm btn-primary"
            type="submit">
            Post Comment
          </button>
        </div>
      </form>
    )
  }
}

function mapStateToProps(state){
  return {
    OnCommonInputCommon:state.common
  }
}

function mapDispatchToProps(dispatch){
  return {
    OnArticle:bindActionCreators(getArticle,dispatch)
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(CommonInput)