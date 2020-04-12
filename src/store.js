import { combineReducers } from "redux"
import { connectRouter } from "connected-react-router"
import auth from "./reducers/auth"
import common from "./reducers/common"
import home from "./reducers/home"

const reducer = (history) => combineReducers({
  router: connectRouter(history),
  auth:auth,
  common:common,
  home:home
})


export default reducer