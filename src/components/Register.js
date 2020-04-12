import { Link } from "react-router-dom";
import React from "react";
import ListError from "../ListErrors";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getlogin, getCommon } from "../Action";
import Axios from "axios";

class Register extends React.PureComponent {
  OnSubmitRegister = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      url: "https://conduit.productionready.io/api/users",
      data: {
        user: {
          username: this.props.RegisterDetails.registerusername.toString(),
          email: this.props.RegisterDetails.registeremail.toString(),
          password: this.props.RegisterDetails.registerpassword.toString(),
        },
      },
    })
      .then((response) => {
        console.log(response);
        window.localStorage.setItem("jwt", response.data.user.token);
        this.props.OnToken({
          token: response.data.user.token,
          currentUser: response.data.user,
          redirectTo: "/",
        });
      })
      .catch(({ response }) => {
        this.props.OnRegister({ errors: response.data.errors });
      });
  };
  componentWillUnmount() {
    this.props.OnRegister({
      email: "",
      password: "",
      inProgress: true,
      errors: null,
      registeremail: "",
      registerpassword: "",
      registerusername: "",
    });
  }
  render() {
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign Up</h1>
              <p className="text-xs-center">
                <Link to="/login">Have an account?</Link>
              </p>

              <ListError errors={this.props.RegisterDetails.errors} />
              <form onSubmit={(event) => this.OnSubmitRegister(event)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      value={this.props.RegisterDetails.registerusername}
                      onChange={(e) => {
                        this.props.OnRegister({
                          registerusername: e.target.value,
                        });
                      }}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={this.props.RegisterDetails.registeremail}
                      onChange={(e) =>
                        this.props.OnRegister({ registeremail: e.target.value })
                      }
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      value={this.props.RegisterDetails.registerpassword}
                      onChange={(e) =>
                        this.props.OnRegister({
                          registerpassword: e.target.value,
                        })
                      }
                    />
                  </fieldset>

                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Sign up
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
    RegisterDetails: state.auth,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnRegister: bindActionCreators(getlogin, dispatch),
    OnToken: bindActionCreators(getCommon, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
