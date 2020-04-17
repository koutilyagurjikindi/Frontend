import React from "react";
import ArticlePreview from "./ArticlePreview";
import ListPagination from "./ListPagination"

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
          return <ArticlePreview article={article} key={article.slug} />;
        })}

        <ListPagination
       articlesCount={this.props.articlesCount}
       currentPage={this.props.currentPage}
       onSetPage={this.props.onSetPage}
        />
      </div>
    );
  }
}

export default ArticleList;
