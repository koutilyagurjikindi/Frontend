import React from "react"
import {Link} from "react-router-dom"
import { connect } from "react-redux"


class ArticleActions extends React.PureComponent{
  render(){
    if(this.props.canModify){
      return(
        <span>
          <Link to={`/editor/${this.props.article.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Article
          </Link>

          <button className="btn btn-outline-danger btn-sm" onClick={this.del}>
          <i className="ion-trash-a"></i> Delete Article
        </button>
        </span>
      )
    }
    return(
      <span>

      </span>
    )
  }
}

function mapDispatchToProps(dispatch){
  return{

  }
}

export default connect(()=>({}), mapDispatchToProps)(ArticleActions)