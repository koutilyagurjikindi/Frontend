const defaultState = {
  profile:null
}

function profile(state=defaultState,action){
  switch(action.type){
    case "PROFILE":
      return Object.assign({}, state, action.payload)
    default:
      return {...state}
  }
}

export default profile