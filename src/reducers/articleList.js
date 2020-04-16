const defaultState = {
  articles:null,
  articleCount:0
}

function articleList(state=defaultState,action){
  switch(action.type){
    case "ARTICLELIST":
      return Object.assign({}, state, action.payload)
    default:
      return {...state}
  }
}

export default articleList