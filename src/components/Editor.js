import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getEditor } from "../Action";
import ListError from "../ListErrors";
import Axios from "axios";

class Editor extends React.PureComponent {
  constructor() {
    super();
    // this.changeTitle = updateFieldEvent('title');
    // this.changeDescription = updateFieldEvent('description');
    // this.changeBody = updateFieldEvent('body');
    // this.changeTagInput = updateFieldEvent('tagInput');

    this.watchForEnter = (ev) => {
      if (ev.keyCode === 13) {
        ev.preventDefault();
        const temp = this.props.OnEditoreditor.tagList;
        if (temp.indexOf(ev.target.value) === -1) {
          temp.push(ev.target.value);
        }
        this.props.OnEditorEditor({ tagList: temp, tagInput: "" });
      }
    };

    this.removeTagHandler = (tag) => () => {
      const temp = this.props.OnEditoreditor.tagList;
      temp.splice(temp.indexOf(tag), 1);
      this.props.OnEditorEditor({ tagList: temp });
    };

    this.submitForm = (ev) => {
      ev.preventDefault();
      const article = {
        title: this.props.OnEditoreditor.title,
        description: this.props.OnEditoreditor.description,
        body: this.props.OnEditoreditor.body,
        tagList: this.props.OnEditoreditor.tagList,
      };
      if (this.props.match.params.hasOwnProperty("slug")) {
        Axios({
          method: "put",
          url: `https://conduit.productionready.io/api/articles/${this.props.match.params.slug}`,
          headers: {
            authorization: `Token ${this.props.OnEditorcommon.token}`,
          },
          data: {
            article: article,
          },
        })
          .then((response) => {
            this.props.OnEditorEditor({
              title: "",
              description: "",
              body: "",
              tagInput: "",
              tagList: [],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        Axios({
          method: "post",
          url: "https://conduit.productionready.io/api/articles",
          headers: {
            authorization: `Token ${this.props.OnEditorcommon.token}`,
          },
          data: {
            article: article,
          },
        })
          .then((response) => {
            this.props.OnEditorEditor({
              title: "",
              description: "",
              body: "",
              tagInput: "",
              tagList: [],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      if (nextProps.match.params.slug) {
        this.props.onUnload();
        // return this.props.onLoad(agent.Articles.get(this.props.params.slug));
      }
      this.props.onLoad(null);
    }
  }
  componentDidMount() {
    if (this.props.match.params.slug) {
      // return this.props.onLoad(agent.Articles.get(this.props.params.slug));
    }
    // this.props.onLoad(null);
  }
  componentWillUnmount() {
    // this.props.onUnload();
  }
  render() {
    return (
      <div className="editor-page">
        <div className="container-page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ListError errors={this.props.errors} />

              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Enter Article Title"
                      value={this.props.OnEditoreditor.title}
                      onChange={(event) => {
                        this.props.OnEditorEditor({
                          title: event.target.value,
                        });
                      }}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="what's is the article about?"
                      value={this.props.OnEditoreditor.description}
                      onChange={(event) => {
                        this.props.OnEditorEditor({
                          description: event.target.value,
                        });
                      }}
                    />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="Write your article"
                      value={this.props.OnEditoreditor.body}
                      onChange={(event) => {
                        this.props.OnEditorEditor({ body: event.target.value });
                      }}
                    ></textarea>
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter tags"
                      value={this.props.OnEditoreditor.tagInput}
                      onChange={(event) => {
                        this.props.OnEditorEditor({
                          tagInput: event.target.value,
                        });
                      }}
                      onKeyUp={this.watchForEnter}
                    />

                    {(this.props.OnEditoreditor.tagList || []).map((tag) => {
                      return (
                        <span className="tag-default tag-pill" key={tag}>
                          <i
                            className="ion-close-round"
                            onClick={this.removeTagHandler(tag)}
                          ></i>
                          {tag}
                        </span>
                      );
                    })}
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitForm}
                  >
                    Publish Article
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
    OnEditoreditor: state.editor,
    OnEditorcommon: state.common,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    OnEditorEditor: bindActionCreators(getEditor, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
