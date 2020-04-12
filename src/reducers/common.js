const defaultvalue ={
  appName: "Conduit",
  token:null,
  redirectTo: null,
  appLoaded:false,
  currentUser:null
}

function common(state=defaultvalue,action){
  switch (action.type) {
    case "COMMON_PAGE":
      return Object.assign({}, state, action.payload)
    default:
     return {...state}
  }
}

export default common