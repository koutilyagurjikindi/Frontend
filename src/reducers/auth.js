const defaultvalue = {
  email:"",
  password:"",
  inProgress: true,
  errors:null,
  registeremail:"",
  registerpassword:"",
  registerusername:""
}

function auth (state=defaultvalue,action){
  switch (action.type) {
    case "LOGIN":
     return Object.assign({}, state, action.payload)
    default:
      return {...state}
  }
}

export default auth