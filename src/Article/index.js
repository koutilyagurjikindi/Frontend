import React from "react";
import { connect } from "react-redux";
import marked from "marked";
import Axios from "axios";
import { bindActionCreators } from "redux";
import { getArticle } from "../Action";
import ArticleMeta from "./ArticleMeta"
import CommentContainer from "./CommentContainer"

class Article extends React.PureComponent {
  componentDidMount(){
   Axios({
     method:"get",
     url:`https://conduit.productionready.io/api/articles/${this.props.match.params.id}`,
   })
   .then(response=>{
     console.log(response)
     this.props.OnArticle({article:response.data.article})
     Axios({
       method:"get",
       url: `https://conduit.productionready.io/api/articles/${this.props.match.params.id}/comments`
     })
     .then(response=>{
       console.log(response)
       this.props.OnArticle({comments:response.data.comments})
     })
   })
   .catch(error=>{
     console.log(error)
   })
  }
  render() {
    if(this.props.OnArticlearticle.article==null){
      return null
    }else{
      const markup = { __html: marked(this.props.OnArticlearticle.article.body, { sanitize: true }) };
      const canModify = this.props.OnArticleCommon.currentUser &&
      this.props.OnArticleCommon.currentUser.username === this.props.OnArticlearticle.article.author.username;
    return(
      <div className="article-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.OnArticlearticle.article.title}</h1>
            <ArticleMeta
              article={this.props.OnArticlearticle.article}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row article-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.OnArticlearticle.article.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="article-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.OnArticlearticle.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.OnArticleCommon.currentUser} />
          </div>
        </div>
      </div>
    );
            }
  }
}

function mapStateToProps(state) {
  return {
    OnArticleCommon: state.common,
    OnArticleAuth: state.auth,
    OnArticlehome: state.home,
    OnArticlearticle:state.article
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnArticle: bindActionCreators(getArticle,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
