const defaultState = {
  title: "",
  description:"",
  body:"",
  tagInput:"",
  tagList:[]
}

function editorreducer(state=defaultState,action){
  switch(action.type){
    case "EDITOR":
      return Object.assign({}, state, action.payload)
    default:
      return {...state}
  }
}

export default editorreducer