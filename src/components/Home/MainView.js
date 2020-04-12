import React from "react";
import ArticleList from "../ArticleList";
import { connect } from "react-redux";

class MainView extends React.PureComponent {
  render() {
    return (
      <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

        <li className="nav-item">
          <a
            href=""
            className="nav-link active">
            Global Feed
          </a>
        </li>

        </ul>
      </div>
      <ArticleList
      articles={this.props.articles}
      />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.home.articles,
  };
}

export default connect(mapStateToProps, () => ({}))(MainView);
