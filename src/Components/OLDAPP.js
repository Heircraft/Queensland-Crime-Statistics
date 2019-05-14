import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import LoginPage from './Components/LoginPage.js';
import Home from './Home.js'

import API from './Api.js'

import LoginPage from './LoginPage.js'
import LoginForm from './LoginForm.js'
import RegisterForm from './RegisterForm.js'
import { Button } from '@material-ui/core';

export function loggedIn () {
   // this.state.isLoggedIn = true;
   return (
      <App isLoggedIn={this.state.isLoggedIn = true}/>
   )
}

class App extends Component {
   constructor(props) {
      super(props);
      this.state = {
          isLoggedIn: false
      };
  }

   render() {
      // this.state.isLoggedIn = this.props.isLoggedIn;
      return (
         <div className="App"> 
            {this.props.isLoggedIn ? <Home/> : <LoginPage/>}
         </div>
         
      )
   }
}
export default App;


// const NewRoute = () => {
//    return (
//       <div>
//          <p>New Route</p>
//       </div>
//   );
// }

   // const {loading, JWT, error} = returnKey();
   // if (loading) {
   //    return<p>Loading...</p>
   // }  
//   if (error) {
//     <p>Something Went Wrong! {error.message}</p>
//   }

   /* <BrowserRouter>
   <Route path="/new" component={NewRoute}/>
   </BrowserRouter> */