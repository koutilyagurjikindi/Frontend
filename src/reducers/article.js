const defaultState = {
  article:null,
  comments:null
}

const  article = (state = defaultState, action) => {
  switch (action.type) {
    case "ARTICLE":
      return Object.assign({}, state, action.payload)
    default:
      return {...state}
  }
};

export default article