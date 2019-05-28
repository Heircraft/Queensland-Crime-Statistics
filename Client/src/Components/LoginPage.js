import React, { Component } from 'react';
import '../Styles/css/Login.css';

import RegisterForm from './RegisterForm.js'
import blue from '../Styles/images/noway.png'

import LoginForm from './LoginForm.js'
import SearchForm from './SearchForm.js'

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

var passwordRegex = /[0-9\sA-Za-z]/;

class LoginPage extends Component { 
   constructor(props) {
      super(props);
      this.state = {
         loginPassword: '',
         loginEmail: '',
         registerPassword: '',
         registerEmail: '',
         error: '',
         JWT: '',
         isLoggedIn: false,

         isLoginOpen: true,
         isRegisterOpen: false,
      };
      this.submitLogin = this.submitLogin.bind(this);
      this.handleLoginEmailChange = this.handleLoginEmailChange.bind(this);
      this.handleLoginPasswordChange = this.handleLoginPasswordChange.bind(this);
      this.logOut = this.logOut.bind(this);
      this.registerSuccess = this.registerSuccess.bind(this);

      this.submitRegister = this.submitRegister.bind(this);
      this.handleRegisterEmailChange = this.handleRegisterEmailChange.bind(this);
      this.handleRegisterPasswordChange = this.handleRegisterPasswordChange.bind(this);
  }

   registerSuccess() {
      this.setState({loginEmail: this.state.registerEmail});
      this.setState({loginPassword: this.state.registerPassword});

      this.setState({isLoginOpen: true})
      this.setState({isRegisterOpen: false})

      this.setState({registerPassword: ''})
      this.setState({registerEmail: ''})
      
      Alert.success('You have successfully registered!', {
         position: 'top',
         effect: 'stackslide',
         timeout: 3000
      });
   }

   handleRegisterPasswordChange = (e) => {
      if (!passwordRegex.test(e.target.value.slice(-1)) && e.target.value.length >= 1) {
         Alert.error('Password cannot contain symbols', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         return;
      }
      this.setState({[e.target.name]: e.target.value})
  }

  handleRegisterEmailChange = (e) => {
   this.setState({[e.target.name]: e.target.value})
}

   submitRegister = (e) => {
      e.preventDefault(); 
     
      if (this.state.registerPassword == '' && this.state.registerEmail == '') {
         Alert.error('Please fill out the given fields', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         this.setState({
            registerPassword: '',
            registerEmail: '',
         })
         return;
      } else if (this.state.registerPassword.length < 6 && !this.state.registerEmail.includes("@")) {
         Alert.error('Password must be 6 Characters', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         Alert.error('please input an email with the @ symbol', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         this.setState({
            registerPassword: '',
            registerEmail: ''
         })
         return;
      } else if (this.state.registerPassword.length < 6) {
         Alert.error('Password must be 6 Characters', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         this.setState({
            registerPassword: '',
         })
         return;
      } else if (!this.state.registerEmail.includes("@")) {
         Alert.error('please input an email with the @ symbol', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         this.setState({
            registerEmail: '',
         })
         return;
      }
     const url = 'https://cab230.hackhouse.sh/register';
      return fetch(url, {
         method: "POST",
         // body: 'email=alexanderflyo%40gmail.com&password=Artem1s12',
         body: `email=${this.state.registerEmail}&password=${this.state.registerPassword}`,
         headers: {
         "Content-type": "application/x-www-form-urlencoded"
         }
      })
      .then(function(res) {
         if (res.status === 201) {
            return res.json();
         } else if (res.status === 400) {
            this.setState({
               registerPassword: '',
               registerEmail: '',
            })
            Alert.error('That account is already registered!', {
               position: 'top',
               effect: 'stackslide',
               timeout: 3000
            });
         }
         throw new Error("Error when registering...try refreshing");     
      })    
      .then((res) => console.log(JSON.stringify(res)))
      .then(this.registerSuccess)

      .catch((error) => {
         console.log(error.message);
      });
      
   }

   handleLoginPasswordChange = (e) => {
      if (!passwordRegex.test(e.target.value.slice(-1)) && e.target.value.length >= 1) {
         Alert.error('Password cannot contain symbols', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         return;
      }
      this.setState({[e.target.name]: e.target.value})
   }

   handleLoginEmailChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
   }

   logOut() {
      this.setState({isLoggedIn: false})
      this.setState({isLoginOpen: true})
   }

  submitLogin = (e) => {
      e.preventDefault(); 

   // if (this.state.loginPassword == '' && this.state.loginEmail == '') {
   //    Alert.error('Please fill out the given fields', {
   //       position: 'top',
   //       effect: 'stackslide',
   //       timeout: 3000
   //    });
   //    this.setState({
   //       loginPassword: '',
   //       loginEmail: '',
   //    })
   //    return;
   // } else if (this.state.loginPassword.length < 6 && !this.state.loginEmail.includes("@")) {
   //    Alert.error('Password must be 6 Characters', {
   //       position: 'top',
   //       effect: 'stackslide',
   //       timeout: 3000
   //    });
   //    Alert.error('please input an email with the @ symbol', {
   //       position: 'top',
   //       effect: 'stackslide',
   //       timeout: 3000
   //    });
   //    this.setState({
   //       loginPassword: '',
   //       loginEmail: ''
   //    })
   //    return;
   // } else if (this.state.loginPassword.length < 6) {
   //    Alert.error('Password must be 6 Characters', {
   //       position: 'top',
   //       effect: 'stackslide',
   //       timeout: 3000
   //    });
   //    this.setState({
   //       loginPassword: '',
   //    })
   //    return;
   // } else if (!this.state.loginEmail.includes("@")) {
   //    Alert.error('please input an email with the @ symbol', {
   //       position: 'top',
   //       effect: 'stackslide',
   //       timeout: 3000
   //    });
   //    this.setState({
   //       loginEmail: '',
   //    })
   //    return;
   // }
   this.setState({
      loginPassword: '',
      loginEmail: '',
   })

   const url = 'https://cab230.hackhouse.sh/login';
   return fetch(url, {
      method: "POST",
      body: 'email=alexanderflyon%40gmail.com&password=Artem1s12',
         // body: `email=${this.state.email}&password=${this.state.password}`,
      headers: {
      "Content-type": "application/x-www-form-urlencoded"
      }
   })
   //   .then((res) => res.json())
   .then(function(res) {
      if (res.status === 200) {
         return res.json();
      } else if (res.status === 401){
         Alert.error('Invalid login credentials. Ensure you are registered', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
      }
      throw new Error("Invalid login credentials. Ensure you are registered");     
   })
   .then((data) => this.setState({JWT: data.token}))
   .then(this.state.isLoggedIn = true)

   .catch((error) => {
      console.log(error.message);
   });
   }

   showRegisterBox() {
     this.setState({isRegisterOpen: true, isLoginOpen:false})
   };

   showLoginBox() {
      this.setState({isLoginOpen: true, isRegisterOpen:false})
   };


   render () {
      if (this.state.isLoggedIn && this.state.JWT !== '') {
         return (
            <div> 
               <SearchForm JWT={this.state.JWT}/>
               <div className="logoutbtn"> 
                  <button onClick={this.logOut} className="btn4"><p>Logout</p></button>
               </div>  
            </div>
         )        
      } 
      else {
         return (
               <div className="root-container">
                  <div className="box-controller">
                     <div className={"controller " + (this.state.isLoginOpen ? "selected-controller" : "")} onClick={this.showLoginBox.bind(this)}>
                        Login
                     </div>
                     <div className={"controller " + (this.state.isRegisterOpen ? "selected-controller" : "")} onClick={this.showRegisterBox.bind(this)}>
                        Register
                     </div>
                  </div>
                  <div className="box-container">
                     {this.state.isLoginOpen && <LoginForm submitLogin={this.submitLogin}handleLoginPasswordChange={this.handleLoginPasswordChange}handleLoginEmailChange={this.handleLoginEmailChange}loginEmail={this.state.loginEmail}loginPassword={this.state.loginPassword}/>}
                     {this.state.isRegisterOpen && <RegisterForm submitRegister={this.submitRegister}handleRegisterPasswordChange={this.handleRegisterPasswordChange}handleRegisterEmailChange={this.handleRegisterEmailChange}registerEmail={this.state.registerEmail}registerPassword={this.state.registerPassword}/>}
                  </div>
               </div>
            );
      }

   }
}   

export default LoginPage





