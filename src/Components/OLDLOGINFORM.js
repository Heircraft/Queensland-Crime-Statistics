import React, { Component } from 'react';
import '../Styles/CSS/Login.css';

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

import LoginPage from './LoginPage.js'

import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Home.js'



var passwordRegex = /[0-9\sA-Za-z]/;
const styles = theme => ({
   textField: {
     flexBasis: 200,
   },
 });

class LoginForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         password: '',
         showPassword: false,
         email: '',
         error: '',
         JWT: '',
         isLoggedIn: false
      };
      this.submitLogin = this.submitLogin.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleClickShowPassword = this.handleClickShowPassword.bind(this);

      this.loginSuccess = this.loginSuccess.bind(this);
   }

   handleClickShowPassword() {
      this.setState({showPassword: !this.state.showPassword});
  };

   loginSuccess() {
      console.log('loginsuccess')
      // this.state.isLoggedIn = true;
   }

   handlePasswordChange = (e) => {
      if (!passwordRegex.test(e.target.value.slice(-1)) && e.target.value.length >= 1) {
         Alert.error('Password cannot contain symbols', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         console.log(e.target.value.slice(-1))
         return;
      }
      this.setState({[e.target.name]: e.target.value})
  }

  handleEmailChange = (e) => {
   this.setState({[e.target.name]: e.target.value})
}

   submitLogin = (e) => {
      e.preventDefault(); 
     
      // if (this.state.password == '' && this.state.email == '') {
      //    Alert.error('Please fill out the given fields', {
      //       position: 'top',
      //       effect: 'stackslide',
      //       timeout: 3000
      //    });
      //    this.setState({
      //       password: '',
      //       email: '',
      //    })
      //    return;
      // } else if (this.state.password.length < 6 && !this.state.email.includes("@")) {
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
      //       password: '',
      //       email: ''
      //    })
      //    return;
      // } else if (this.state.password.length < 6) {
      //    Alert.error('Password must be 6 Characters', {
      //       position: 'top',
      //       effect: 'stackslide',
      //       timeout: 3000
      //    });
      //    this.setState({
      //       password: '',
      //    })
      //    return;
      // } else if (!this.state.email.includes("@")) {
      //    Alert.error('please input an email with the @ symbol', {
      //       position: 'top',
      //       effect: 'stackslide',
      //       timeout: 3000
      //    });
      //    this.setState({
      //       email: '',
      //    })
      //    return;
      // }
      this.setState({
         password: '',
         email: '',
      })
     
     const url = 'https://cab230.hackhouse.sh/login';
      return fetch(url, {
         method: "POST",
         body: 'email=alexanderflyon%40gmail.com&password=Artem1s12',
         //  body: `email=${this.state.email}&password=${this.state.password}`,
         headers: {
         "Content-type": "application/x-www-form-urlencoded"
         }
      })
      //   .then((res) => res.json())
      .then(function(res) {
         if (res.ok) {
            return res.json();
         }
         Alert.error('Invalid login credentials. Ensure you are registered', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         throw new Error("Invalid login credentials. Ensure you are registered");     
      })
      
      .then((res) => this.state.JWT=res.token)

      // .then(this.state.isLoggedin = true)
      .then(this.loginSuccess)


      .catch((error) => {
         console.log(error.message);
      });
      
   }

   render() {
      const { classes } = this.props;
      if (this.state.isLoggedIn == true) {
         return (
            <LoginPage isRegisterOpen={this.state.isRegisterOpen = true}/>
         )        
      }
      return (

         <form onSubmit={this.submitLogin}>
            <div className="inner-container">

            <Alert stack ={{limit: 2}}/>

               <div className="box">
                  <div className="login-title">
                     Login
                  </div>
                  <div className="input-group">
                     <FormControl className={classNames(classes.textField)}>               
                           <InputLabel htmlFor="adornment-password">Email</InputLabel>
                           <Input
                              name="email"
                              id="adornment-password"
                              onChange={this.handleEmailChange}
                              value ={this.state.email}
                              margin="normal"
                           />  
                     </FormControl>        
                  </div>
                  
                  <div className="input-group-pass">
                     <FormControl className={classNames(classes.textField)}>                       
                        <InputLabel htmlFor="adornment-password">Password</InputLabel>
                        <Input
                           name="password"
                           id="adornment-password"
                           onChange={this.handlePasswordChange}
                           value ={this.state.password}
                           type={this.state.showPassword ? "text" : "password"}
                           margin="normal"
                           endAdornment={
                              <InputAdornment position="end">
                                 <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                 >
                                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                 </IconButton>
                              </InputAdornment>
                           }
                        />  
                        <button type="submit" className="login-btn">Login</button>
                     </FormControl>        
                  </div> 
               </div>
            </div>
         </form>
      )
   }
}
export default withStyles(styles)(LoginForm);
LoginForm.propTypes = {
   classes: PropTypes.object.isRequired,
 };
