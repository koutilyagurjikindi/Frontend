import { combineReducers } from "redux"
import auth from "./reducers/auth"
import common from "./reducers/common"
import home from "./reducers/home"
import article from "./reducers/article"
import articleList from "./reducers/articleList"
import profile from "./reducers/Profile"

const reducer = combineReducers({
  article:article,
  articleList:articleList,
  profile:profile,
  auth:auth,
  common:common,
  home:home
})


export default reducer