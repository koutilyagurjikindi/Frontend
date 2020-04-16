import React from "react"
import { Link } from "react-router-dom"
import ArticleActions from "./ArticleActions"

class ArticleMeta extends React.PureComponent{
  render(){
    const article = this.props.article
    return(
      <div className="article-meta">
       <Link to={`${article.author.username}`}>
          <img src={article.author.image}/>
       </Link>

       <div className="info">
          <Link to={`@${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          <span className="date">
          {new Date(article.createdAt).toDateString()}
        </span>
       </div>
       <ArticleActions canModify={this.props.canModify} article={article} />
      </div>
    )
  }
}

export default ArticleMeta