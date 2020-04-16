import React from "react";
import { connect } from "react-redux";
import Header from "./components/Header";
import Home from "./components/Home";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import { bindActionCreators } from "redux";
import { getCommon, gethomepage } from "./Action";
import {store} from "./index"
import {push} from "react-router-redux"
import Axios from "axios";
import Register from "./components/Register";
import Setting from "./components/Setting";
import Article from "./Article"
import Profile from "./components/Profile";
import ProfileFavorites from "./components/ProfileFavourites"

class App extends React.PureComponent {
  componentWillMount(){
    const token = window.localStorage.getItem('jwt');
    if(token){
      this.props.OnCommon({token:token})
      Axios({
        method:"get",
        url:"https://conduit.productionready.io/api/user",
        headers:{
          authorization:`Token ${token}`
        }
      })
      .then(response=>{
        this.props.OnCommon({currentUser:response.data.user})
      })
      .catch(({response})=>{
        console.log(response)
      })
    }
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.appName.redirectTo!=null){
      store.dispatch(push("/"));
      this.props.OnCommon({redirectTo:null})
    }
  }
  render() {
    return (
      <div>
        <Header appName={this.props.appName} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register}/>
          <Route path="/setting" component={Setting}/>
          <Route path="/article/:id" component={Article} />
          <Route path="/@:username/favorites" component={ProfileFavorites} />
          <Route path="/@:username" component={Profile} />
        </Switch>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return { appName: state.common};
}

function mapDispatchToProps(dispatch){
  return {
    OnCommon: bindActionCreators(getCommon,dispatch),
    OnApphome: bindActionCreators(gethomepage,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);

// import React from "react";

// export default class App extends React.PureComponent {
//   render() {
//     return (
//       <div>
//         <h1 title={"koutilya"}>Hello world</h1>
//         <h2>Hello world</h2>
//         <h3>Hello world</h3>
//         <h4>Hello world</h4>
//         <h5>Hello world</h5>
//         <h6>Hello world</h6>

//         {/* Paragraph */}

//         <p><a href={"https://www.google.com"} target={"_blank"}> koutilya</a> recently <strong>changed</strong> into full stack <em>developer</em></p>

//         {/* Inline  */}
        
//         <strong>Koutilya</strong>
//         <br/>
//         <br/>

//         <em>Koutilya</em>
//         <br/>
//         <br/>

//         <a href="https://www.google.com">Koutilya</a>
//         <br/>
//         <br/>

//           {/* List */}

//           {/* unordered list */}
//           <ul>
//             <li >koutilya</li>
//             <li>Sanjay</li>
//             <li>Ravi</li>
//             <li>Praneeth</li>
//           </ul>

//           {/* Order list */}
//           <ol>
//           <li >koutilya</li>
//             <li>Sanjay</li>
//             <li>Ravi</li>
//             <li>Praneeth</li>
//           </ol>

//           {/* Table */}
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Email</th>
//                 <th>Age</th>
//               </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                   <td>koutilya</td>
//                   <td>koutilya56@gmail.com</td>
//                   <td>45</td>
//                 </tr>
//                 <br></br>
//                 <tr>
//                   <td>Praneeth</td>
//                   <td>Praneeth@gmail.com</td>
//                   <td>55</td>
//                 </tr>
//                 <br></br>
//                 <tr>
//                   <td>Praneeth</td>
//                   <td>Praneeth@gmail.com</td>
//                   <td>55</td>
//                 </tr>
//             </tbody>
//           </table>

//           {/* Forms  */}
//         <hr></hr>
//           <form>
//             <label>first</label>
//             <input type="text" />
//             <lable>Second</lable>
//             <input value={"30"} type="text"/>
//           </form>

//           {/* Large Text area */}
//           <div>
//             <textarea name="message"/>
//           </div>

//           <div>
//             <label>Gender</label>
//             <select name="Gender">
//               <option value={"Male"}>Male</option>
//               <option value={"Female"}>Female</option>
//             </select>
//           </div>
//           <div>
//             <label>Age</label>
//             <input value="30" type={"number"} name={"age"}/>
//           </div>
//           <div>
//             <label>BirthDay</label>
//             <input  type={"date"} name={"BirthDay"}/>
//           </div>
//           <input type="submit" name="submit" value="Submit"/>

//           {/* Button */}

//           <button>Sign Up</button>

//           {/* Image */}
//           <a href={"https://i.pinimg.com/474x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg"}>
//           <img width={"200px"} height={"100px"}  src={"https://i.pinimg.com/474x/2e/2f/ac/2e2fac9d4a392456e511345021592dd2.jpg"} alt="my Image"/>
//           </a>

//           {/* Quotation */}
//           <blockquote cite={"https://www.google.com"}> Google com</blockquote>

//           <p>this is <abbr title="koutilya is a full stack developer">koutilya</abbr></p>
          
//           <p>this is <cite>how the world becoming</cite> </p>
//           <div style={{marginTop:"500px"}}></div>
//       </div>
//     );
//   }
// }


