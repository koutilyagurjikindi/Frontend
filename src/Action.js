const HOME_PAGE_LOADED = "HOME_PAGE_LOADED"
const LOGIN = "LOGIN"
const COMMON_PAGE="COMMON_PAGE"
const ARTICLE = "ARTICLE"
const ARTICLELIST = "ARTICLELIST"
const PROFILE = "PROFILE"

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

const articlesreducer = (data) => {
  return {
    type:ARTICLE,
    payload:data
  }
}

export const getArticle = (data) => {
 return dispatch =>{
   dispatch(articlesreducer(data))
 }
}

const articleList = data =>{
  return {
    type: ARTICLELIST,
    payload:data
  }
}

export const getarticleList = data => {
  return dispatch => {
    dispatch(articleList(data))
  }
}

const profile = data =>{
  return {
    type: PROFILE,
    payload:data
  }
}

export const getProfile = data => {
  return dispatch => {
    dispatch(profile(data))
  }
}