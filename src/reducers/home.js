const defaultState = {
  articles: null,
};
const home = function (state = defaultState, action) {
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return { ...state, articles: action.payload.articles };
    default:
      return {...state}
  }
};

export default home