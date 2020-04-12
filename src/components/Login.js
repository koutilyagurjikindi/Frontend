import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getlogin, getCommon } from "../Action";
import Axios from "axios";
import ListErrors from "../ListErrors"


class Login extends React.Component {
  OnSubmitLogin=(event)=>{
    event.preventDefault();
    Axios({
      method:"post",
      url:"https://conduit.productionready.io/api/users/login",
      data:{
        user:{
          email:this.props.LoginDetails.email,
          password:this.props.LoginDetails.password
        }
      }
    })
    .then(response=>{
      window.localStorage.setItem('jwt',response.data.user.token)
      this.props.OnToken({token:response.data.user.token,currentUser:response.data.user,redirectTo:'/'})
    })
    .catch(({response})=>{
      this.props.OnLogin({errors:response.data.errors})
    })
  }
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign In</h1>
              <p className="text-xs-center">
                <a>Need an account?</a>
              </p>
              <ListErrors errors={this.props.LoginDetails.errors}/>
              <form onSubmit={(event)=>this.OnSubmitLogin(event)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.LoginDetails.email}
                      onChange={(e) =>{if(this.props.LoginDetails.email === ""  || this.props.LoginDetails.password === ""){this.props.OnLogin({inProgress:true})}else{this.props.OnLogin({inProgress:false})}this.props.OnLogin({email:e.target.value,errors:null})}}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.LoginDetails.password}
                      onChange={(e) =>{if(this.props.LoginDetails.email === "" || this.props.LoginDetails.password === ""){this.props.OnLogin({inProgress:true})}else{this.props.OnLogin({inProgress:false})}this.props.OnLogin({password:e.target.value,errors:null})}}
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={this.props.LoginDetails.inProgress}
                  >
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    LoginDetails: state.auth,
    TokenDetails: state.common
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnLogin: bindActionCreators(getlogin, dispatch),
    OnToken: bindActionCreators(getCommon,dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
