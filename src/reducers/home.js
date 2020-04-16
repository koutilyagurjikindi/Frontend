const defaultState = {
  articles: null,
  tabs:"all",
  tags:null,
  tag:null
};
const home = function (state = defaultState, action) {
  switch (action.type) {
    case "HOME_PAGE_LOADED":
      return Object.assign({}, state, action.payload)
      case 'CHANGE_TAB':
      return {
        ...state,
        articles: action.payload.articles,
        tabs: action.tabs
      };
      case 'APPLY_TAG_FILTER':
        return {
          ...state,
          articles: action.payload.articles,
          tabs: null,
          tag: action.tag
        };
    default:
      return {...state}
  }
};

export default home