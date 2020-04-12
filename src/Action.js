const HOME_PAGE_LOADED = "HOME_PAGE_LOADED"
const LOGIN = "LOGIN"
const COMMON_PAGE="COMMON_PAGE"

const homepage = (data)=>{
  return {
    type:HOME_PAGE_LOADED,
    payload:data
  }
}

export const gethomepage = (data) =>{
  return dispatch =>{
    dispatch(homepage(data))
  }
}

const login = (data) =>{
  return {
    type:LOGIN,
    payload:data
  }
}

export const getlogin = (data) => {
  return dispatch => {
    dispatch(login(data))
  }
}

const common = (data) => {
  return {
    type:COMMON_PAGE,
    payload:data
  }
}

export const getCommon = (data) => {
  return dispatch => {
    dispatch(common(data))
  }
}