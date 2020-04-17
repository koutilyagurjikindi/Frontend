import React from "react";
import ArticleList from "./ArticleList";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Axios from "axios";
import { bindActionCreators } from "redux";
import { getProfile, getarticleList } from "../Action";

class EditProfileSettings extends React.PureComponent {
  render() {
    if (this.props.isUser) {
      return (
        <Link
          to="/setting"
          className="btn btn-sm btn-outline-secondary action-btn"
        >
          <i className="ion-gear-a"></i>EditProfileSettings
        </Link>
      );
    }
    return null;
  }
}

class FollowUserButton extends React.PureComponent {
  handleClick() {
    if (this.props.user.following) {
      this.props.unfollow(this.props.user.username);
    } else {
      this.props.follow(this.props.user.username);
    }
  }

  render() {
    if (this.props.isUser) {
      return null;
    }

    let classes = "btn btn-sm action-btn";
    if (this.props.user.following) {
      classes += " btn-secondary";
    } else {
      classes += " btn-outline-secondary";
    }
    return (
      <button className={classes} onClick={() => this.handleClick()}>
        <i className="ion-plus-round"></i>
        &nbsp;
        {this.props.user.following ? "Unfollow" : "Follow"}{" "}
        {this.props.user.username}
      </button>
    );
  }
}

class Profile extends React.PureComponent {
  componentDidMount() {
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
          method: "get",
          url: `https://conduit.productionready.io/api/articles?author=${this.props.match.params.username}&limit=5`,
          headers: {
            authorization: `Token ${this.props.OnProfilecommon.token}`,
          },
        }).then((response) => {
          this.props.OnProfileArticleList({
            articles: response.data.articles,
            articleCount: response.data.articlesCount,
          });
        });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
  renderTabs() {
    return (
      <ul className="nav nav-pills outline-active">
      <li className="nav-item">
        <Link
          className={(this.props.match.path !=="/@:username/favorites")?"nav-link active": "nav-link"}
          to={`/@${this.props.OnProfileprofile.profile.username}`}>
          My Articles
        </Link>
      </li>

      <li className="nav-item">
        <Link
          className={(this.props.match.path ==="/@:username/favorites")?"nav-link active": "nav-link"}
          to={`/@${this.props.OnProfileprofile.profile.username}/favorites`}>
          Favorited Articles
        </Link>
      </li>
    </ul>
    );
  }
  render() {
    const profile = this.props.OnProfileprofile.profile;
    if (profile !== null) {
      const isUser =
      this.props.OnProfilecommon.currentUser &&
      this.props.OnProfileprofile.profile.username ===
        this.props.OnProfilecommon.currentUser.username;
      return (
        <div className="profile-page">
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={profile.image} className="user-img" />
                  <h4>{profile.username}</h4>
                  <p>{profile.bio}</p>

                  <EditProfileSettings isUser={isUser} />
                  <FollowUserButton
                    isUser={isUser}
                    user={profile}
                    follow={this.props.onFollow}
                    unfollow={this.props.onUnfollow}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">{this.renderTabs()}</div>
                <ArticleList
                  articles={this.props.OnProfilearticleList.articles}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    OnProfilecommon: state.common,
    OnProfileprofile: state.profile,
    OnProfilearticleList: state.articleList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnProfile: bindActionCreators(getProfile, dispatch),
    OnProfileArticleList: bindActionCreators(getarticleList, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

// if(this.props.OnProfilecommon.currentUser){
//   const isUser =
//   this.props.OnProfilecommon.currentUser &&
//   this.props.OnProfileprofile.profile.username ===
//     this.profile.OnProfilecommon.currentUser.username;
// return(
//   <div className="profile-page">
//     <div className="user-info">
//       <div className="container">
//         <div className="row">
//           <div className="col-xs-12 col-md-10 offset-md-1">
//             <img src={profile.image} className="user-img" />
//             <h4>{profile.username}</h4>
//             <p>{profile.bio}</p>

//             <EditProfileSettings isUser={isUser} />
//             <FollowUserButton
//               isUser={isUser}
//               user={profile}
//               follow={this.props.onFollow}
//               unfollow={this.props.onUnfollow}
//             />
//           </div>
//         </div>
//       </div>
//     </div>

//     <div className="container">
//       <div className="row">
//         <div className="col-xs-12 col-md-10 offset-md-1">
//           <div className="articles-toggle">{this.renderTabs()}</div>
//           <ArticleList
//             articles={this.props.OnProfilearticleList.articles}
//           />
//         </div>
//       </div>
//     </div>
//   </div>
// );
// }
