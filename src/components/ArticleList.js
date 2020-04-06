import React from "react";

class ArticleList extends React.PureComponent {
  render() {
    if (!this.props.articles) {
      return <div className={"article-preview"}>Loading...</div>;
    }
    if (this.props.articles.length === 0) {
      return <div className="article-preview">No articles preview</div>;
    }

    return (
      <div>
        {this.props.articles.map((article) => {
          return <h1>{article.title}</h1>;
        })}
      </div>
    );
  }
}

export default ArticleList;
