import React from "react";
import ArticleList from "../ArticleList";
import { connect } from "react-redux";
import Axios from "axios";
import { bindActionCreators } from "redux";
import {  gethomepage } from "../../Action";

const TagFilterTab = props => {
  if (!props.tag) {
    return null;
  }

  return (
    <li className="nav-item">
      <a href="" className="nav-link active">
        <i className="ion-pound"></i> {props.tag}
      </a>
    </li>
  );
};


const YourFeedTab = props => {
  if (props.token) {
    const clickHandler = ev => {
      ev.preventDefault();
    Axios({
      method:"get",
      url:"https://conduit.productionready.io/api/articles/feed?limit=10",
      headers:{
        authorization: `Token ${props.token}`
      }
    })
    .then(response=>{
      props.onTabClick({ articles:response.data.articles, tabs:"feed",articleCount:response.data.articlesCount,currentPage:1});
    })
    .catch(error=>{
      console.log(error)
    })
    }

    return (
      <li className="nav-item">
        <a  href=""
            className={ props.tab === 'feed' ? 'nav-link active' : 'nav-link' }
            onClick={clickHandler}>
          Your Feed
        </a>
      </li>
    );
  }
  return null;
};

const GlobalFeedTab = props => {
  const clickHandler = ev => {
    ev.preventDefault();
    Axios({
      method:"get",
      url:"https://conduit.productionready.io/api/articles?limit=10",
    })
    .then(response=>{
      props.onTabClick({ articles:response.data.articles, tabs:"all",articleCount:response.data.articlesCount,currentPage:1});
    })
    .catch(error=>{
      console.log(error)
    })
  };
  return (
    <li className="nav-item">
      <a
        href=""
        className={ props.tab === 'all' ? 'nav-link active' : 'nav-link' }
        onClick={clickHandler}>
        Global Feed
      </a>
    </li>
  );
};


class MainView extends React.PureComponent {
  onSetPage = page => {
    if(this.props.OnMainViewhome.tabs == "all"){
      Axios({
        method:"get",
        url:`https://conduit.productionready.io/api/articles?limit=10&offset=${page*10}`,
      })
      .then(response=>{
       this.props.OnMainViewHome({ articles:response.data.articles, tabs:"all",articleCount:response.data.articlesCount,currentPage:page});
      })
      .catch(error=>{
        console.log(error)
      })
    }else{
      Axios({
        method:"get",
        url:`https://conduit.productionready.io/api/articles/feed?limit=10&offset=${page*10}`,
        headers:{
          authorization: `Token ${this.props.OnMainViewcommon.token}`
        }
      })
      .then(response=>{
        this.props.OnMainViewHome({ articles:response.data.articles, tabs:"feed",articleCount:response.data.articlesCount,currentPage:page});
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
  render() {
    console.log(this.props.OnMainViewhome)
    return (
      <div className="col-md-9">
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">

        <YourFeedTab
            token={this.props.OnMainViewcommon.token}
            tab={this.props.OnMainViewhome.tabs}
            onTabClick={this.props.OnMainViewHome} />

          <GlobalFeedTab tab={this.props.OnMainViewhome.tabs} onTabClick={this.props.OnMainViewHome} />

          <TagFilterTab tag={this.props.OnMainViewhome.tag} />

        </ul>
      </div>
      <ArticleList
      articles={this.props.OnMainViewhome.articles}
      articlesCount={this.props.OnMainViewhome.articleCount}
      currentPage={this.props.OnMainViewhome.currentPage}
      onSetPage={this.onSetPage}
      />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    OnMainViewhome: state.home,
    OnMainViewcommon: state.common
  };
}

function mapDispatchToProps(dispatch){
  return {
    OnMainViewHome:bindActionCreators(gethomepage,dispatch),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(MainView);
