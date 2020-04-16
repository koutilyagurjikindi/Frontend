import React from "react"
import CommonInput from "./CommonInput"
import CommentList from "./CommentList"
import {Link} from "react-router-dom"
import ListError from "../ListErrors"


class CommentContainer extends React.PureComponent{
  render(){
    if(this.props.currentUser){
      return(
        <div>
          <div>
            <ListError errors={this.props.errors}/>
            <CommonInput slug={this.props.slug} currentUser={this.props.currentUser}/>
          </div>
          <CommentList
               comments={this.props.comments}
               slug={this.props.slug}
               currentUser={this.props.currentUser} 
            />
        </div>
      )
    }else{
      <div className="col-xs-12 col-md-8 offset-md-2">
        <p>
          <Link to="login">Sign in</Link>
          &nbsp;or&nbsp;
          <Link to="register">sign up</Link>
          &nbsp;to add comments on this article.
        </p>

        <CommentList
          comments={this.props.comments}
          slug={this.props.slug}
          currentUser={this.props.currentUser} />
      </div>
    }
  }
}

export default CommentContainer