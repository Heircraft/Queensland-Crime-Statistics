
import React, { Component } from 'react';
import '../Styles/css/Login.css';

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
const styles = theme => ({
   textField: {
     flexBasis: 200,
   },
 });

class RegisterForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         password: '',
         showPassword: false,
         email: '',
         error: '',

         registerSuccess:''
      };
      this.submitRegister = this.submitRegister.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
      this.registerSuccess = this.registerSuccess.bind(this);
   }

   handleClickShowPassword() {
      this.setState({showPassword: !this.state.showPassword});
  };

  registerSuccess() {
   Alert.success('You have successfully registered!', {
      position: 'top',
      effect: 'stackslide',
      timeout: 3000
   });
   
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

   submitRegister = (e) => {
      e.preventDefault(); 
     
      if (this.state.password == '' && this.state.email == '') {
         Alert.error('Please fill out the given fields', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         this.setState({
            password: '',
            email: '',
         })
         return;
      } else if (this.state.password.length < 6 && !this.state.email.includes("@")) {
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
            password: '',
            email: ''
         })
         return;
      } else if (this.state.password.length < 6) {
         Alert.error('Password must be 6 Characters', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         this.setState({
            password: '',
         })
         return;
      } else if (!this.state.email.includes("@")) {
         Alert.error('please input an email with the @ symbol', {
            position: 'top',
            effect: 'stackslide',
            timeout: 3000
         });
         this.setState({
            email: '',
         })
         return;
      }
      this.setState({
         password: '',
         email: '',
      })
     
     const url = 'https://cab230.hackhouse.sh/register';
      return fetch(url, {
         method: "POST",
         // body: 'email=alexanderflyo%40gmail.com&password=Artem1s12',
         body: `email=${this.state.email}&password=${this.state.password}`,
         headers: {
         "Content-type": "application/x-www-form-urlencoded"
         }
      })
      .then(function(res) {
         if (res.status === 201) {
            return res.json();
         } else if (res.status === 400) {
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

   render() {
      const { classes } = this.props;
      return (
         <form onSubmit={this.submitRegister}>
            <div className="inner-container">
            
            <Alert stack ={{limit: 2}}/>

               <div className="box">
                  <div className="login-title">
                     Register
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
                        <button type="submit" className="login-btn">Register</button>
                     </FormControl>        
                  </div> 
                  
               </div>
            </div>
         </form>
      )
   }
}
export default withStyles(styles)(RegisterForm);
RegisterForm.propTypes = {
   classes: PropTypes.object.isRequired,
 };
