import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Axios from "axios"
import { getProfile, getarticleList } from "../Action";
import Profile from "./Profile"

class ProfileFavourites extends Profile{
  componentWillMount(){
    Axios({
      method: "get",
      url: `https://conduit.productionready.io/api/profiles/${this.props.match.params.username}`,
      headers: {
        authorization: `Token ${this.props.OnProfilecommon.token}`,
      },
    })
      .then((response) => {
        this.props.OnProfile({ profile: response.data.profile });
        Axios({
          method:"get",
          url:`https://conduit.productionready.io/api/articles?favorited=${this.props.match.params.username}&limit=5`
        })
        .then(response=>{
          console.log(response)
          this.props.OnProfileArticleList({
            articles: response.data.articles,
            articleCount: response.data.articlesCount,
          });
        })
      })
      .catch(({response})=>{
        console.log(response)
      })
  }
  renderTabs() {
    console.log(this.props.match)
    return (
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className="nav-link"
            to={`/@${this.props.OnProfileprofile.profile.username}`}>
            My Articles
          </Link>
        </li>

        <li className="nav-item">
          <Link
            className="nav-link active"
            to={`/@${this.props.OnProfileprofile.profile.username}/favorites`}>
            Favorited Articles
          </Link>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state){
  return{
    OnProfilecommon: state.common,
    OnProfileprofile: state.profile,
  }
}

function mapDispatchToProps(dispatch){
  return {
    OnProfile: bindActionCreators(getProfile, dispatch),
    OnProfileArticleList: bindActionCreators(getarticleList, dispatch),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProfileFavourites)