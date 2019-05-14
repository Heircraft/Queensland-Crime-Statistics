import React, { Component } from 'react';
import { useState, useEffect} from 'react';
import LoginForm from './LoginForm.js'
import App from './App.js'
// export function returnKey() {
   
//    const[loading, setLoading] = useState(true);
//    const[JWT, setJWT] = useState([]);
//    const[error, setError] = useState(null);
//    useEffect(() => {
//      getAPIKey().then((JWT) => {
//        alert(JWT);
//        setJWT(JWT);
//        setLoading(false);
//      })
//      .catch((e) => {
//        setError(e);
//        setLoading(false);
//      });
//    },[]);
//    return {
//      loading,
//      JWT,
//      error:null,
//    }
//  }
 
//  export function getAPIKey() {
//    const url = 'https://cab230.hackhouse.sh/login';
//    return fetch(url, {
//      method: "POST",
//      body: 'email=alexanderflyon%40gmail.com&password=Artem1s12',
//      headers: {
//          "Content-type": "application/x-www-form-urlencoded"
//      }
//    })
//    .then((res) => res.json())
//    .then((res) => res.token)
 
//    .catch((error )=> {
//      console.log("There has been a problem with your fetch operation: ",error);
//    });
//  };

// // const GetAPIKey = (props) => {
// //    console.log("we did it +",props.email)
// //    return (
// //    // console.log(props.email)
// //    <a>{props.email}</a>
//    // )
//    // const url = 'https://cab230.hackhouse.sh/login';
//    // return fetch(url, {
//    //   method: "POST",
//    //   body: `email=${props.email}password=${props.password}`,
//    //   headers: {
//    //       "Content-type": "application/x-www-form-urlencoded"
//    //   }
//    // })
//    // .then((res) => console.log(res.json()))
//    // .then((res) => res.token)
   
 
//    // .catch(error => {
//    //   console.log("There has been a problem with your fetch operation: ",error.message);
//    // });
// //  };

// class API extends Component {
//    constructor(props) {
//       super(props);
//       this.state = {
//       };
//    }
   
//     render() {
//       console.log(this.props.password);
//        return (
//           <div>
//          {/* <GetAPIKey email={this.props.email}/> */}

//          </div>
//        );
//     }
//  }
//  export default API;

class API extends Component {
   constructor(props) {
      super(props);
      this.state = {
         isLoggedIn: true
      };
   }
   
    render() {
       console.log("you made it to api")
       return (
          <div>
            <App isLoggedIn={this.state.isLoggedIn}/>
         </div>
       );
    }
 }
 export default API;