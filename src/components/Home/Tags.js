import React from 'react';
import agent from '../../agent';
import Axios from 'axios';
import { connect } from 'react-redux';

const Tags = props => {
  const tags = props.tags;
  if (tags) {
    return (
      <div className="tag-list">
        {
          tags.map(tag => {
            const handleClick = ev => {
              ev.preventDefault();
              Axios({
                method:"get",
                url:`https://conduit.productionready.io/api/articles?tag=${tag}&limit=10`,
                headers:{
                  authorization: `Token ${props.OnTagscommon.token}`
                }
              })
              .then(response=>{
                props.onClickTag(tag,response.data);
              })
              .catch(error=>{
                console.log(error)
              })
            };

            return (
              <a
                href=""
                className="tag-default tag-pill"
                key={tag}
                onClick={handleClick}>
                {tag}
              </a>
            );
          })
        }
      </div>
    );
  } else {
    return (
      <div>Loading Tags...</div>
    );
  }
};

function mapStateToProps(state){
  return{
    OnTagscommon: state.common
  }
}

function mapDispatchToProps(dispatch){
  return{
    onClickTag: (tag, payload) =>
    dispatch({ type: 'APPLY_TAG_FILTER', tag, payload }),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tags);